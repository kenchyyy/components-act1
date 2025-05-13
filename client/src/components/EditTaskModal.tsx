"use client";

import type React from "react";

import { useState, useEffect } from "react";
import type { Task, ChecklistItem } from "../types/Task";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { PlusCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

export function EditTaskModal({
  task,
  isOpen,
  onClose,
  onSave,
}: EditTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { text: "", completed: false },
  ]);

  // Reset form when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setDueDate(
        task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ""
      );

      if (task.type === "checklist" && task.items && task.items.length > 0) {
        setChecklistItems(task.items);
      } else {
        setChecklistItems([{ text: "", completed: false }]);
      }
    }
  }, [task]);

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { text: "", completed: false }]);
  };

  const handleChecklistItemChange = (index: number, value: string) => {
    const updatedItems = [...checklistItems];
    updatedItems[index].text = value;
    setChecklistItems(updatedItems);
  };

  const handleChecklistItemToggle = (index: number) => {
    const updatedItems = [...checklistItems];
    updatedItems[index].completed = !updatedItems[index].completed;
    setChecklistItems(updatedItems);
  };

  const handleRemoveChecklistItem = (index: number) => {
    const updatedItems = [...checklistItems];
    updatedItems.splice(index, 1);
    setChecklistItems(updatedItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!task || !title.trim()) return;

    const updatedTask: Task = {
      ...task,
      title,
      description: description || undefined,
      dueDate: dueDate || null,
    };

    if (task.type === "checklist") {
      updatedTask.items = checklistItems.filter(
        (item) => item.text.trim() !== ""
      );
    }

    onSave(updatedTask);
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[500px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='edit-title'>Title</Label>
              <Input
                id='edit-title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Task title'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='edit-description'>Description (optional)</Label>
              <Textarea
                id='edit-description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Task description'
                rows={3}
              />
            </div>

            {(task.type === "timed" || task.type === "basic") && (
              <div className='space-y-2'>
                <Label htmlFor='edit-dueDate'>Due Date & Time</Label>
                <Input
                  id='edit-dueDate'
                  type='datetime-local'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            )}

            {task.type === "checklist" && (
              <div className='space-y-2'>
                <Label>Checklist Items</Label>

                {checklistItems.map((item, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={item.completed}
                      onChange={() => handleChecklistItemToggle(index)}
                      className='h-4 w-4'
                    />
                    <Input
                      value={item.text}
                      onChange={(e) =>
                        handleChecklistItemChange(index, e.target.value)
                      }
                      placeholder={`Item ${index + 1}`}
                      className='flex-1'
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      onClick={() => handleRemoveChecklistItem(index)}
                      disabled={checklistItems.length <= 1}
                    >
                      <X className='h-4 w-4' />
                      <span className='sr-only'>Remove item</span>
                    </Button>
                  </div>
                ))}

                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={handleAddChecklistItem}
                  className='mt-2'
                >
                  <PlusCircle className='h-4 w-4 mr-2' />
                  Add Item
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit'>Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
