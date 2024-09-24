import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Event from "./Event";
import Sidebar from "./Sidebar";
import CalendarHeader from "./CalendarHeader";
import { useState } from "react";

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 24; i++) {
    slots.push(`${i.toString().padStart(2, "0")}:00`);
  }
  return slots;
};

const events = [
  {
    id: 1,
    title: "Team Meeting",
    description: "Weekly team sync-up",
    start: "09:00",
    end: "10:00",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Lunch with Client",
    description: "Discuss project requirements",
    start: "12:30",
    end: "13:30",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Project Review",
    description: "End of sprint review",
    start: "15:00",
    end: "16:30",
    color: "bg-purple-500",
  },
];

export default function DayCalendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const timeColumnRef = useRef(null);
  const scrollAreaRef = useRef(null);

  const [view, setView] = useState("day");

  const navigateDay = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (timeColumnRef.current && scrollAreaRef.current) {
        timeColumnRef.current.scrollTop = scrollAreaRef.current.scrollTop;
      }
    };

    const scrollAreaElement = scrollAreaRef.current;
    if (scrollAreaElement) {
      scrollAreaElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollAreaElement) {
        scrollAreaElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      <CalendarHeader
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onViewChange={setView}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentDate={currentDate} onDateChange={setCurrentDate} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="flex" style={{ height: `${24 * 5}rem` }}>
              <div className="w-16 flex-shrink-0">
                {generateTimeSlots().map((time, index) => (
                  <div
                    key={time}
                    className="h-20 flex items-center justify-center text-sm text-gray-500"
                  >
                    {time}
                  </div>
                ))}
              </div>
              <div className="flex-1 relative">
                {generateTimeSlots().map((time, index) => (
                  <div
                    key={time}
                    className="absolute w-full h-20 border-t border-gray-200"
                    style={{ top: `${index * 5}rem` }}
                  ></div>
                ))}
                {events.map((event) => (
                  <Event key={event.id} event={event} />
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
