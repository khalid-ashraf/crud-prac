"use server";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users, User } from "@/db/schema";

export async function getUsers() {
  try {
    const allUsers = await db.select().from(users);
    return allUsers;
  } catch (error) {
    throw new Error("Failed to fetch users", { cause: error });
  }
}

export async function createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">) {
  try {
    await db.insert(users).values(user);
  } catch (error) {
    throw new Error("Failed to create user", { cause: error });
  }
}

export async function updateUser(user: Omit<User, "createdAt" | "updatedAt">) {
  try {
    await db.update(users).set(user).where(eq(users.id, user.id));
  } catch (error) {
    throw new Error("Failed to update user", { cause: error });
  }
}

export async function deleteUser(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id));
  } catch (error) {
    throw new Error("Failed to delete user", { cause: error });
  }
}
