"use client";

import { memo, useState } from "react";

import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import UserDialogWrapper from "./ui/user-dialog-wrapper";
import { deleteUser } from "@/server/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteUserProps {
  userId: string;
}

const DeleteUserButton = ({ userId }: DeleteUserProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (close: () => void) => {
    try {
      setIsLoading(true);
      await deleteUser(userId);
      toast.success("User deleted successfully");
      router.refresh();
      close();
    } catch (error) {
      toast.error("Action unsuccessful");
      throw new Error("Error", { cause: error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserDialogWrapper
      trigger={
        <Button variant='ghost' className='hover:text-red-400'>
          <Trash2 className='size-4' />
        </Button>
      }
      title='Are you absolutely sure?'
      description='This action cannot be undone. This will permanently delete your account and remove your data from our servers.'
    >
      {(close) => (
        <div className='flex justify-end'>
          <Button variant='destructive' disabled={isLoading} onClick={() => handleDelete(close)}>
            {isLoading ? <Loader2 className=' size-4 animate-spin' /> : "Delete"}
          </Button>
        </div>
      )}
    </UserDialogWrapper>
  );
};

DeleteUserButton.displayName = "DeleteUserButton";
export default memo(DeleteUserButton);
