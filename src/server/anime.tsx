"use server";
import { db } from "@/db";
import { anime } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export type AnimeType = typeof anime.$inferSelect;

export const getAllAnime = async () => {
  try {
    return await db.select().from(anime).orderBy(anime.sts, anime.judulAnime);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAnimeBySlug = cache(async (slug: string) => {
  try {
    const [data] = await db.select().from(anime).where(eq(anime.linkAnime, slug)).limit(1);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
});
