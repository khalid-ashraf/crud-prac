"use client";

import { useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserDialogWrapperProps {
  trigger: ReactNode;
  title: string;
  description: string;
  children: (close: () => void) => ReactNode;
}

export default function UserDialogWrapper({
  trigger,
  title,
  description,
  children,
}: UserDialogWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {children(() => setIsOpen(false))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
