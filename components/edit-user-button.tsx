"use client";

import { memo } from "react";
import { Button } from "./ui/button";

import { Pencil } from "lucide-react";

import UserForm from "./ui/user-form";
import UserDialogWrapper from "./ui/user-dialog-wrapper";
import { User } from "@/db/schema";

interface EditUserProps {
  user?: User;
}

const EditUserButton = ({ user }: EditUserProps) => (
  <UserDialogWrapper
    trigger={
      <Button variant='ghost' className='hover:text-gray-400'>
        <Pencil />
      </Button>
    }
    title='Edit User'
    description='Edit details'
  >
    {(close) => <UserForm onSuccess={close} user={user} />}
  </UserDialogWrapper>
);

EditUserButton.displayName = "EditUserButton";

export default memo(EditUserButton);
