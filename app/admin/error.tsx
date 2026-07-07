"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertCircle size={24} />
            </div>
          </div>
          <CardTitle>Something went wrong!</CardTitle>
          <CardDescription>
            We encountered an unexpected error while loading this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground bg-slate-50 p-3 rounded border text-left font-mono overflow-auto max-h-32">
            {error.message || "Unknown error"}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
