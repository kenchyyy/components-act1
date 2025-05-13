"use client";

import type React from "react";

import { useState } from "react";
import type { Task, ChecklistItem } from "../types/Task";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { PlusCircle, X } from "lucide-react";

interface TaskFactoryProps {
  type: "basic" | "timed" | "checklist";
  onAddTask: (task: Task) => void;
  onCancel: () => void;
}

// Factory Method Pattern
export function TaskFactory({ type, onAddTask, onCancel }: TaskFactoryProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { text: "", completed: false },
  ]);

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { text: "", completed: false }]);
  };

  const handleChecklistItemChange = (index: number, value: string) => {
    const updatedItems = [...checklistItems];
    updatedItems[index].text = value;
    setChecklistItems(updatedItems);
  };

  const handleRemoveChecklistItem = (index: number) => {
    const updatedItems = [...checklistItems];
    updatedItems.splice(index, 1);
    setChecklistItems(updatedItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(), // This will be a number
      title,
      description: description || undefined,
      completed: false,
      type,
    };

    if (type === "timed" || type === "basic") {
      newTask.dueDate = dueDate || null;
    }

    if (type === "checklist") {
      newTask.items = checklistItems.filter((item) => item.text.trim() !== "");
    }

    onAddTask(newTask);

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setChecklistItems([{ text: "", completed: false }]);
  };

  // Render different task forms based on type
  const renderTaskForm = () => {
    switch (type) {
      case "basic":
        return (
          <BasicTaskForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
        );

      case "timed":
        return (
          <TimedTaskForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            dueDate={dueDate}
            setDueDate={setDueDate}
          />
        );

      case "checklist":
        return (
          <ChecklistTaskForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            checklistItems={checklistItems}
            onAddItem={handleAddChecklistItem}
            onChangeItem={handleChecklistItemChange}
            onRemoveItem={handleRemoveChecklistItem}
          />
        );

      default:
        return (
          <BasicTaskForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {renderTaskForm()}

      <div className='flex justify-end gap-2'>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button type='submit'>Add Task</Button>
      </div>
    </form>
  );
}

// Basic Task Form Component
function BasicTaskForm({
  title,
  setTitle,
  description,
  setDescription,
}: {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}) {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Task title'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Description (optional)</Label>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Task description'
          rows={3}
        />
      </div>
    </div>
  );
}

// Timed Task Form Component
function TimedTaskForm({
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
}: {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
}) {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Task title'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Description (optional)</Label>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Task description'
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='dueDate'>Due Date & Time</Label>
        <Input
          id='dueDate'
          type='datetime-local'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
    </div>
  );
}

// Checklist Task Form Component
function ChecklistTaskForm({
  title,
  setTitle,
  description,
  setDescription,
  checklistItems,
  onAddItem,
  onChangeItem,
  onRemoveItem,
}: {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  checklistItems: ChecklistItem[];
  onAddItem: () => void;
  onChangeItem: (index: number, value: string) => void;
  onRemoveItem: (index: number) => void;
}) {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Task title'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Description (optional)</Label>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Task description'
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label>Checklist Items</Label>

        {checklistItems.map((item, index) => (
          <div key={index} className='flex items-center gap-2'>
            <Input
              value={item.text}
              onChange={(e) => onChangeItem(index, e.target.value)}
              placeholder={`Item ${index + 1}`}
              className='flex-1'
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={() => onRemoveItem(index)}
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
          onClick={onAddItem}
          className='mt-2'
        >
          <PlusCircle className='h-4 w-4 mr-2' />
          Add Item
        </Button>
      </div>
    </div>
  );
}
