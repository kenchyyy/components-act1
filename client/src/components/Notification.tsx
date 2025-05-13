"use client";

import { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

// Observer Pattern
interface NotificationProps {
  message: string;
  type?: "warning" | "error" | "success" | "info";
}

export function Notification({ message }: NotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Alert
      variant='destructive'
      className='absolute -top-4 right-0 w-auto max-w-xs transform translate-y-[-50%] z-10'
    >
      <AlertCircle className='h-4 w-4' />
      <AlertDescription className='ml-2'>{message}</AlertDescription>
      <button
        onClick={() => setVisible(false)}
        className='absolute top-2 right-2'
        aria-label='Close notification'
      >
        <X className='h-4 w-4' />
      </button>
    </Alert>
  );
}

export class TaskNotificationObserver {
  private static observers: ((task: any) => void)[] = [];

  static subscribe(observer: (task: any) => void) {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter((obs) => obs !== observer);
    };
  }

  static notify(task: any) {
    this.observers.forEach((observer) => observer(task));
  }
}
