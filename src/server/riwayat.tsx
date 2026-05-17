"use server";
import { db } from "@/db";
import { riwayat } from "@/db/schema";
import { desc } from "drizzle-orm";

export type RiwayatType = typeof riwayat.$inferSelect;
export type RiwayatAddType = typeof riwayat.$inferInsert;

export const getAllRiwayat = async () => {
  try {
    return await db.select().from(riwayat).orderBy(desc(riwayat.createdAt));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addRiwayat = async (values: RiwayatAddType) => {
  try {
    await db.insert(riwayat).values(values);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
