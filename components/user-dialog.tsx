"use client";

import { memo } from "react";

import { Button } from "./ui/button";
import { UserPlus } from "lucide-react";
import UserForm from "./ui/user-form";
import UserDialogWrapper from "./ui/user-dialog-wrapper";

const UserDialog = () => (
  <div className='flex justify-end'>
    <UserDialogWrapper
      trigger={
        <Button>
          Add User
          <UserPlus className='size-4' />
        </Button>
      }
      title='Add User'
      description='Enter details to add user.'
    >
      {(close) => <UserForm onSuccess={close} />}
    </UserDialogWrapper>
  </div>
);

UserDialog.displayName = "UserDialog";
export default memo(UserDialog);
