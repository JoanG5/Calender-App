'use client'

import React, { useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// Helper function to generate time slots
const generateTimeSlots = () => {
  const slots = []
  for (let i = 0; i < 24; i++) {
    slots.push(`${i.toString().padStart(2, '0')}:00`)
  }
  return slots
}

// Sample events data
const events = [
  { id: 1, title: 'Team Meeting', start: '09:00', end: '10:00', color: 'bg-blue-500' },
  { id: 2, title: 'Lunch with Client', start: '12:30', end: '13:30', color: 'bg-green-500' },
  { id: 3, title: 'Project Review', start: '15:00', end: '16:30', color: 'bg-purple-500' },
]

export function DayCalendarJsx() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const timeColumnRef = useRef(null)
  const scrollAreaRef = useRef(null)

  const navigateDay = (days) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + days)
    setCurrentDate(newDate)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (timeColumnRef.current && scrollAreaRef.current) {
        timeColumnRef.current.scrollTop = scrollAreaRef.current.scrollTop
      }
    }

    const scrollAreaElement = scrollAreaRef.current
    if (scrollAreaElement) {
      scrollAreaElement.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollAreaElement) {
        scrollAreaElement.removeEventListener('scroll', handleScroll)
      }
    };
  }, [])

  return (
    (<div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" onClick={() => navigateDay(-1)}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Day</span>
        </Button>
        <h1 className="text-2xl font-semibold">
          {currentDate.toLocaleDateString(
            'en-US',
            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          )}
        </h1>
        <Button variant="outline" size="icon" onClick={() => navigateDay(1)}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Day</span>
        </Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-16 flex-shrink-0 overflow-hidden" ref={timeColumnRef}>
          <div className="relative" style={{ height: `${24 * 5}rem` }}>
            {generateTimeSlots().map((time, index) => (
              <div
                key={time}
                className="absolute w-full h-20 flex items-center justify-center text-sm text-gray-500"
                style={{ top: `${index * 5}rem` }}>
                {time}
              </div>
            ))}
          </div>
        </div>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="relative" style={{ height: `${24 * 5}rem` }}>
            {generateTimeSlots().map((time, index) => (
              <div
                key={time}
                className="absolute w-full h-20 border-t border-gray-200"
                style={{ top: `${index * 5}rem` }}></div>
            ))}
            {events.map((event) => {
              const startMinutes = parseInt(event.start.split(':')[0]) * 60 + parseInt(event.start.split(':')[1])
              const endMinutes = parseInt(event.end.split(':')[0]) * 60 + parseInt(event.end.split(':')[1])
              const duration = endMinutes - startMinutes
              const top = (startMinutes / 60) * 5
              const height = (duration / 60) * 5

              return (
                (<div
                  key={event.id}
                  className={`absolute left-1 right-1 p-2 rounded ${event.color} text-white overflow-hidden`}
                  style={{
                    top: `${top}rem`,
                    height: `${height}rem`,
                  }}>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm">{`${event.start} - ${event.end}`}</p>
                </div>)
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>)
  );
}