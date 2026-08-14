"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { createViewing } from "@/convex/propertyViewings";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface ScheduleViewingProps {
  property: {
    _id: Id<"properties">;
    title: string;
  };
}

export default function ScheduleViewing({ property }: ScheduleViewingProps) {
  const [success, setSuccess] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createViewing = useMutation(api.propertyViewings.createViewing);

  const { user } = useUser();

  const availableTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  function isDateDisabled(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    if (!user) {
      alert("please signin");
      return;
    }

    setIsSubmitting(true);

    try {
      await createViewing({
        propertyId: property?._id,
        propertyTitle: property?.title,
        userEmail: user?.emailAddresses?.[0]?.emailAddress,

        userName: user.fullName || user.firstName || "Unknown",
        userPhone: phone,
        viewingDate: format(selectedDate, "yyyy-MM-dd"),
        viewingTime: selectedTime,
        userId: user.id,
        message: message,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedDate(undefined);
        setSelectedTime("");
        setMessage("");
        setPhone("");
      }, 2000);
    } catch (error) {
      console.error("Error scheduling viewing:", error);
      alert("Failed to schedule viewing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-[200px]">Schedule Viewing</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              Book a viewing for "{property.title}"
            </DialogDescription>
          </DialogHeader>

          {success ? (
            <div className="text-center py-8">
              <h1>Viewing Scheduled</h1>
              <p>We'll contact you soon to confirm your appointment</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 overflow-y-auto max-h-[50vh]"
            >
              {/* Calender */}

              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={isDateDisabled}
                className="rounded-lg border w-full"
              />

              {/* Time Selection */}
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <Button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm border rounded-md transition-colors ${selectedTime === time ? "bg-red-700 text-white" : "bg-white text-black hover:bg-gray-200"}`}
                    >
                      <Clock className="w-3 h-3 inline mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label className="my-2">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label className="my-2">Message (optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></Textarea>
              </div>

              <Button type="submit" disabled={!selectedDate || !selectedTime}>
                {isSubmitting ? "Sending" : "Scheduale"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
