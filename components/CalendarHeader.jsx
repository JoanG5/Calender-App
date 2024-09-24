import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CalendarHeader({ currentDate, onDateChange, onViewChange }) {
  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-semibold">
          {currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h1>
        <Button onClick={goToToday} variant="outline">
          Today
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onDateChange(
              new Date(currentDate.setDate(currentDate.getDate() - 1))
            )
          }
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Day</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onDateChange(
              new Date(currentDate.setDate(currentDate.getDate() + 1))
            )
          }
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Day</span>
        </Button>
        <Select onValueChange={onViewChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}

export default CalendarHeader;
