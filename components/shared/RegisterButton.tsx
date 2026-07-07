"use client";

import { useState, useTransition } from "react";
import { registerForEvent } from "@/app/actions/registrationActions";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";

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
        setError(result.error || "An error occurred");
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
    <div className="flex flex-col gap-2">
      <Button 
        onClick={handleRegister} 
        disabled={isPending}
        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
      >
        {isPending ? "Registering..." : "Register Now"}
      </Button>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
