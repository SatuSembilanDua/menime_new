import { relations } from "drizzle-orm/relations";
import { pgTable, timestamp, text, foreignKey, uniqueIndex, serial, integer } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const meta = pgTable(
  "Meta",
  {
    id: serial().primaryKey().notNull(),
    hash: text().notNull(),
    command: text().notNull(),
    status: integer().default(0),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [uniqueIndex("Meta_hash_key").using("btree", table.hash.asc().nullsLast().op("text_ops"))]
);

export const riwayat = pgTable("Riwayat", {
  id: serial().primaryKey().notNull(),
  link: text().notNull(),
  title: text().notNull(),
  desc: text().notNull(),
  createdAt: timestamp({ precision: 3, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
});

export const anime = pgTable(
  "Anime",
  {
    idAnime: text("id_anime").primaryKey().notNull(),
    judulAnime: text("judul_anime").notNull(),
    linkAnime: text("link_anime").notNull(),
    origin: text().notNull(),
    sts: integer().notNull(),
    src: integer().notNull(),
    img: text().notNull(),
    studio: text(),
    season: text(),
    tags: text(),
    ketSts: integer("ket_sts").notNull(),
    display: integer().notNull(),
    gambar: text().notNull(),
  },
  (table) => [uniqueIndex("Anime_link_anime_key").using("btree", table.linkAnime.asc().nullsLast().op("text_ops"))]
);

export const episode = pgTable(
  "Episode",
  {
    idEpisode: text("id_episode").primaryKey().notNull(),
    idAnime: text("id_anime").notNull(),
    link: text().notNull(),
    eps: text().notNull(),
    judul: text().notNull(),
    date: text().notNull(),
    idEps: integer("id_eps").notNull(),
    vid: text().notNull(),
  },
  (table) => [
    uniqueIndex("Episode_link_key").using("btree", table.link.asc().nullsLast().op("text_ops")),
    foreignKey({
      columns: [table.idAnime],
      foreignColumns: [anime.idAnime],
      name: "Episode_id_anime_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

export const episodeRelations = relations(episode, ({ one }) => ({
  anime: one(anime, {
    fields: [episode.idAnime],
    references: [anime.idAnime],
  }),
}));

export const animeRelations = relations(anime, ({ many }) => ({
  episodes: many(episode),
}));
