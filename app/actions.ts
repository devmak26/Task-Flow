"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;
  const dueDate = formData.get("dueDate") as string;

  await prisma.task.create({
    data: {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId: user.sub,
    },
  });

  revalidatePath("/");
}

export async function toggleTask(id: string, completed: boolean) {
  await prisma.task.update({
    where: { id },
    data: {
      completed: !completed,
    },
  });

  revalidatePath("/");
}

export async function updateTask(
  id: string,
  title: string,
  description: string
) {
  await prisma.task.update({
    where: { id },
    data: {
      title,
      description,
    },
  });

  revalidatePath("/");
}

export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id },
  });

  revalidatePath("/");
}