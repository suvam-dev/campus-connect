"use client";

import { useState, useTransition } from "react";
import { registerForEvent } from "@/app/actions/registrationActions";
import { Button, buttonVariants } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";

interface RegisterButtonProps {
  eventId: string;
  isRegisteredInitial: boolean;
  registrationIdInitial?: string;
}

export default function RegisterButton({ eventId, isRegisteredInitial, registrationIdInitial }: RegisterButtonProps) {
  const [isRegistered, setIsRegistered] = useState(isRegisteredInitial);
  const [registrationId, setRegistrationId] = useState<string | undefined>(registrationIdInitial);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = () => {
    setError(null);
    startTransition(async () => {
      const result = await registerForEvent(eventId);
      if (result.success) {
        setIsRegistered(true);
        if (result.registrationId) setRegistrationId(result.registrationId);
      } else {
        if (result.error === "INCOMPLETE_PROFILE") {
          setError("INCOMPLETE_PROFILE");
        } else {
          setError(result.error || "An error occurred");
        }
      }
    });
  };

  if (isRegistered) {
    return (
      <div className="flex flex-col items-center gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 w-full">
        <div className="text-emerald-700 font-bold flex items-center gap-2">
          Registered ✓
        </div>
        {registrationId && (
          <div className="bg-white p-3 rounded-xl shadow-sm border border-emerald-100">
            <QRCodeSVG value={registrationId} size={150} level="H" />
          </div>
        )}
        <p className="text-xs text-emerald-600 text-center font-medium">
          Show this QR code at the event for entry.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button 
          onClick={handleRegister} 
          disabled={isPending}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
        >
          {isPending ? "Registering..." : "Register Now"}
        </Button>
        {error && error !== "INCOMPLETE_PROFILE" && <span className="text-sm text-red-500">{error}</span>}
      </div>

      <Dialog open={error === "INCOMPLETE_PROFILE"} onOpenChange={(open) => !open && setError(null)}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <UserCircle2 className="w-6 h-6 text-indigo-600" />
            </div>
            <DialogTitle className="text-center text-xl font-bold">Complete Your Profile</DialogTitle>
            <DialogDescription className="text-center text-slate-500 pt-2">
              To register for campus events, please complete your profile. It only takes a minute!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-col gap-2 mt-6">
            <Link 
              href="/profile" 
              className={buttonVariants({ className: "w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11" })}
            >
              Complete Profile
            </Link>
            <Button variant="ghost" className="w-full rounded-xl h-11 text-slate-500 hover:text-slate-900" onClick={() => setError(null)}>
              Maybe Later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
