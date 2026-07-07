"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteEvent } from "@/app/actions/eventActions";

export default function DeleteEventButton({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return;
    }
    
    setLoading(true);
    try {
      await deleteEvent(eventId);
    } catch (err) {
      console.error(err);
      alert("Failed to delete event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      title="Delete Event" 
      onClick={handleDelete}
      disabled={loading}
      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
