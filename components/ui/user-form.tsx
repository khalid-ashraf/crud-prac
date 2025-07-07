"use client";

import { memo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUser, updateUser } from "@/server/users";
import { useRouter } from "next/navigation";
import { User } from "@/db/schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface UserFormProps {
  onSuccess?: () => void;
  user?: User;
}

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
  email: z.string().email(),
});

const UserForm = ({ onSuccess, user }: UserFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const userData = {
        ...values,
        password: "password123",
      };

      if (user) {
        await updateUser({
          ...userData,
          id: user.id,
        });
      } else {
        await createUser(userData);
      }
      form.reset();
      onSuccess?.();

      toast.success(`User ${user ? "updated" : "added"} successfully.`);
    } catch (error) {
      toast.error("Failed to add user");
      throw new Error("Failed to create user", { cause: error });
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Bruce Wayne' {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='bruce@wayne.com' {...field} />
              </FormControl>
              <FormDescription>This is your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? <Loader2 className='size-4 animate-spin' /> : "Add User"}
        </Button>
      </form>
    </Form>
  );
};

UserForm.displayName = "UserForm";

export default memo(UserForm);
