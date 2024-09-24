import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Sidebar({ currentDate, onDateChange }) {
  const [displayedMonth, setDisplayedMonth] = useState(new Date(currentDate));
  const [sharedWith, setSharedWith] = React.useState([]);

  const sharedUsers = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  const navigateMonth = (direction) => {
    const newMonth = new Date(displayedMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setDisplayedMonth(newMonth);
  };

  const daysInMonth = new Date(
    displayedMonth.getFullYear(),
    displayedMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    displayedMonth.getFullYear(),
    displayedMonth.getMonth(),
    1
  ).getDay();

  const handleDateClick = (day) => {
    const newDate = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth(),
      day
    );
    onDateChange(newDate);
  };

  const handleShareToggle = (userId) => {
    setSharedWith((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="w-64 p-4 border-r">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Month</span>
          </Button>
          <h2 className="text-lg font-semibold">
            {displayedMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth(1)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Month</span>
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div key={day} className="text-center text-sm font-medium">
              {day}
            </div>
          ))}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const isCurrentDay =
              day === currentDate.getDate() &&
              displayedMonth.getMonth() === currentDate.getMonth() &&
              displayedMonth.getFullYear() === currentDate.getFullYear();
            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`text-center p-1 rounded-full ${
                  isCurrentDay
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Shared with:</h3>
        {sharedUsers.map((user) => (
          <div key={user.id} className="flex items-center space-x-2">
            <Checkbox
              id={`user-${user.id}`}
              checked={sharedWith.includes(user.id)}
              onCheckedChange={() => handleShareToggle(user.id)}
            />
            <Label htmlFor={`user-${user.id}`}>{user.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
