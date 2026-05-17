"use server";
import { db } from "@/db";
import { anime, episode } from "@/db/schema";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { and, asc, desc, eq, gt, ilike, lt, or, SQL } from "drizzle-orm";
import { cache } from "react";

export type EpisodeType = typeof episode.$inferSelect;
export type CursorResponse = {
  items: EpisodeType[];
  nextCursor: number | null;
  hasMore: boolean;
};
export type NavEpisodeType = {
  prev: string | null;
  next: string | null;
};

type Params = { idAnime: string; sts: number; sort: boolean; search: string; cursor?: number | null };

export const getEpisodesByIdAnime = async ({
  idAnime,
  sts,
  sort = false,
  search,
  cursor = null,
}: Params): Promise<CursorResponse> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const defaultDesc = sts === 0;
  const useDesc = sort === false ? defaultDesc : !defaultDesc;
  const conditions: Array<SQL<unknown> | undefined> = [eq(episode.idAnime, idAnime)];
  if (search.trim()) {
    conditions.push(or(ilike(episode.judul, `%${search}%`), ilike(episode.eps, `%${search}%`)));
  }
  if (cursor !== null && cursor !== undefined) {
    if (useDesc) {
      conditions.push(lt(episode.idEps, cursor));
    } else {
      conditions.push(gt(episode.idEps, cursor));
    }
  }
  const items = await db
    .select()
    .from(episode)
    .where(and(...conditions))
    .orderBy(useDesc ? desc(episode.idEps) : asc(episode.idEps))
    .limit(ITEMS_PER_PAGE + 1);
  const hasMore = items.length > ITEMS_PER_PAGE;
  const result = hasMore ? items.slice(0, ITEMS_PER_PAGE) : items;
  const nextCursor = hasMore ? (result[result.length - 1]?.idEps ?? null) : null;
  return {
    items: result,
    nextCursor,
    hasMore,
  };
};

export const getChapterNav = cache(
  async (idAnime: string, sts: number | null, num: number): Promise<NavEpisodeType> => {
    try {
      if (sts == null || idAnime == null) {
        return { prev: null, next: null };
      }
      const [p, n] = await Promise.all([
        db
          .select({ id: episode.link })
          .from(episode)
          .where(and(eq(episode.idAnime, idAnime), lt(episode.idEps, num)))
          .orderBy(sts == 0 ? desc(episode.idEps) : asc(episode.idEps))
          .limit(1),
        db
          .select({ id: episode.link })
          .from(episode)
          .where(and(eq(episode.idAnime, idAnime), gt(episode.idEps, num)))
          .orderBy(sts == 0 ? desc(episode.idEps) : asc(episode.idEps))
          .limit(1),
      ]);
      return { prev: p[0]?.id ?? null, next: n[0]?.id ?? null };
    } catch (error) {
      console.log(error);
      return { prev: null, next: null };
    }
  }
);

export const getEpisodeAnimeBySlug = cache(async (slug: string) => {
  try {
    const [data] = await db
      .select({
        idEpisode: episode.idEpisode,
        idAnime: episode.idAnime,
        anime: anime.judulAnime,
        linkAnime: anime.linkAnime,
        sts: anime.sts,
        img: anime.img,
        link: episode.link,
        eps: episode.eps,
        judul: episode.judul,
        date: episode.date,
        idEps: episode.idEps,
        vid: episode.vid,
      })
      .from(episode)
      .leftJoin(anime, eq(episode.idAnime, anime.idAnime))
      .where(eq(episode.link, slug))
      .limit(1);
    const dataNav = await getChapterNav(data.idAnime, data.sts, data.idEps);
    return {
      ...data,
      nav: dataNav,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const getAllEpisodeByAnime = async (idAnime: string) => {
  try {
    return await db.select().from(episode).where(eq(episode.idAnime, idAnime)).orderBy(asc(episode.idEps));
  } catch (error) {
    console.error(error);
    return null;
  }
};
