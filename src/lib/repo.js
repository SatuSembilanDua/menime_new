import DataModel from "./DataModel"
import prisma from "./prisma"

export const animeModel = new DataModel(prisma.anime, "anime", {
	orderBy: [
		{
			sts: "asc",
		},
		{
			judul_anime: "asc",
		},
	],
})
animeModel.getOngoing = async function () {
	const data = await this.tbl.findMany({
		select: {
			id_anime: true,
			link_anime: true,
		},
		where: {
			sts: 0,
		},
	})
	return data
}
animeModel.getForEpisode = async function (slug) {
	const data = await this.tbl.findUnique({
		select: {
			id_anime: true,
			link_anime: true,
			sts: true,
		},
		where: {
			link_anime: slug,
		},
	})
	return data
}
animeModel.upsert = async function (data) {
	try {
		const dataAnime = await this.tbl.upsert({
			where: {
				id_anime: data.id_anime,
			},
			update: data,
			create: data,
		})
		return dataAnime
	} catch (error) {
		console.log(error.message)
		throw new Error(`Failed to add '${this.name}' data.`)
	}
}

export const episodeModel = new DataModel(prisma.episode, "episode", {
	searh_config: [
		{
			judul: {
				contains: "",
				mode: "insensitive",
			},
		},
	],
})
episodeModel.upsert = async function (data) {
	try {
		const dataAnime = await this.tbl.upsert({
			where: {
				id_episode: data.id_episode,
			},
			update: data,
			create: data,
		})
		return dataAnime
	} catch (error) {
		console.log(error.message)
		throw new Error(`Failed to add '${this.name}' data.`)
	}
}
episodeModel.getEpisode = async function (slug) {
	try {
		const dataEpisode = await this.tbl.findUnique({
			include: {
				Anime: {
					select: {
						id_anime: true,
						judul_anime: true,
						link_anime: true,
						sts: true,
						img: true,
					},
				},
			},
			where: {
				link: slug,
			},
		})
		const id_anime = dataEpisode.id_anime
		const id_eps = dataEpisode.id_eps
		const qprev = await this.tbl.findMany({ select: { link: true }, where: { id_eps: id_eps - 1, id_anime } })
		const qnext = await this.tbl.findMany({ select: { link: true }, where: { id_eps: id_eps + 1, id_anime } })
		const prev = id_eps == 1 ? null : qprev.length == 0 ? null : qprev[0]?.link
		const next = qnext.length == 0 ? null : qnext[0]?.link
		return {
			prev: prev,
			data: dataEpisode,
			next: next,
		}
	} catch (error) {
		console.log(error.message)
		throw new Error(`Failed to get '${this.name}' data.`)
	}
}

export const HistoryModel = new DataModel(prisma.riwayat, "riwayat", {})
