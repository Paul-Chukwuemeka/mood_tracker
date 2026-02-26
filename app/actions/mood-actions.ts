"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { type MoodEntry, Prisma } from "@prisma/client";

function formatMoodEntry(entry: MoodEntry) {
  return {
    id: entry.id,
    mood: entry.mood,
    tags: entry.tags,
    text: entry.text,
    date: entry.date.toISOString(),
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString(),
    userId: entry.userId,
  };
}

export async function createMoodEntry(data: {
  userId: string;
  mood: string;
  tags: string[];
  text: string;
}) {
  try {
    const entry = await prisma.moodEntry.create({
      data: {
        mood: data.mood,
        tags: data.tags,
        text: data.text,
        userId: data.userId,
      },
    });
    revalidatePath("/");
    return {
      success: true,
      data: formatMoodEntry(entry),
    };
  } catch (error) {
    console.error("Error creating mood entry:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P1017") {
        return { success: false, error: "Database connection lost. Please try again." };
      }
    }
    return { success: false, error: "Failed to create mood entry" };
  }
}

export async function getMoodEntries(userId: string) {
  try {
    const entries = await prisma.moodEntry.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return {
      success: true,
      data: entries.map(formatMoodEntry),
    };
  } catch (error) {
    console.error("Error fetching mood entries:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P1017") {
        return { success: false, error: "Database connection lost. Please try again." };
      }
    }
    return { success: false, error: "Failed to fetch mood entries" };
  }
}

export async function getTodayEntry(userId: string) {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const entry = await prisma.moodEntry.findFirst({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (!entry) return { success: true, data: null };

    return {
      success: true,
      data: formatMoodEntry(entry),
    };
  } catch (error) {
    console.error("Error fetching today's entry:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P1017") {
        return { success: false, error: "Database connection lost. Please try again." };
      }
    }
    return { success: false, error: "Failed to fetch today's entry" };
  }
}

export async function deleteMoodEntry(id: string) {
  try {
    const entry = await prisma.moodEntry.delete({
      where: { id },
    });
    revalidatePath("/");
    return {
      success: true,
      data: formatMoodEntry(entry),
    };
  } catch (error) {
    console.error("Error deleting mood entry:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P1017") {
        return { success: false, error: "Database connection lost. Please try again." };
      }
    }
    return { success: false, error: "Failed to delete mood entry" };
  }
}
