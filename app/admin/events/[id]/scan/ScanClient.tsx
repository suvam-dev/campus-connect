"use client";

import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { markAttendance } from "@/app/actions/attendanceActions";
import { Button } from "@/components/ui/button";

export default function ScanClient({ eventId }: { eventId: string }) {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleScan = async (text: string) => {
    if (loading || result === text) return;
    
    setResult(text);
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const response = await markAttendance(text);
    
    if (response.success && response.user) {
      setSuccessMsg(`Checked in: ${response.user.name} (${response.user.email})`);
    } else {
      setError(response.error || "Failed to mark attendance.");
    }
    
    setLoading(false);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setSuccessMsg(null);
  };

  return (
    <div className="flex flex-col items-center max-w-sm mx-auto space-y-6">
      <div className="w-full rounded-2xl overflow-hidden border-4 border-slate-100 shadow-xl bg-black">
        <Scanner 
          onScan={(detectedCodes) => {
            if (detectedCodes.length > 0) {
              handleScan(detectedCodes[0].rawValue);
            }
          }}
          onError={(err: any) => console.error(err)}
          formats={["qr_code"]}

        />
      </div>

      <div className="w-full min-h-[100px] text-center">
        {loading && <p className="text-indigo-600 font-medium">Processing...</p>}
        {error && <p className="text-rose-600 font-medium">{error}</p>}
        {successMsg && <p className="text-emerald-600 font-bold">{successMsg}</p>}
        {!loading && !error && !successMsg && (
          <p className="text-slate-500">Point the camera at a registration QR code</p>
        )}
      </div>

      {result && (
        <Button onClick={handleReset} variant="outline" className="w-full">
          Scan Another
        </Button>
      )}
    </div>
  );
}
