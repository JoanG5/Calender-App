import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Helper function to generate time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 24; i++) {
    slots.push(`${i.toString().padStart(2, "0")}:00`);
  }
  return slots;
};

// Event component
const Event = ({ event, onEdit, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

  const handleEdit = () => {
    onEdit(editedEvent);
    setIsEditing(false);
    setIsOpen(false);
  };

  const handleRemove = () => {
    onRemove(event.id);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={`absolute left-1 right-1 p-2 rounded ${event.color} text-white overflow-hidden cursor-pointer`}
          style={{
            top: `${
              (parseInt(event.start.split(":")[0]) * 60 +
                parseInt(event.start.split(":")[1])) /
              12
            }rem`,
            height: `${
              (parseInt(event.end.split(":")[0]) * 60 +
                parseInt(event.end.split(":")[1]) -
                (parseInt(event.start.split(":")[0]) * 60 +
                  parseInt(event.start.split(":")[1]))) /
              12
            }rem`,
          }}
        >
          <h3 className="font-semibold">{event.title}</h3>
          <p className="text-sm">{`${event.start} - ${event.end}`}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            {`${event.start} - ${event.end}`}
          </DialogDescription>
        </DialogHeader>
        {!isEditing ? (
          <div className="py-4">
            <p>{event.description}</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" onClick={handleRemove}>
                <Trash className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={editedEvent.title}
                  onChange={(e) =>
                    setEditedEvent({ ...editedEvent, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={editedEvent.description}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start" className="text-right">
                  Start
                </Label>
                <Input
                  id="start"
                  value={editedEvent.start}
                  onChange={(e) =>
                    setEditedEvent({ ...editedEvent, start: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end" className="text-right">
                  End
                </Label>
                <Input
                  id="end"
                  value={editedEvent.end}
                  onChange={(e) =>
                    setEditedEvent({ ...editedEvent, end: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleEdit}>Save changes</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Event;
