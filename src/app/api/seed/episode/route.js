import { NextRequest, NextResponse } from "next/server"
import { episodeModel as model, animeModel } from "@/lib/repo"
import { getAnime, getEpisode } from "@/lib/perapian"

export const GET = async (request) => {
	try {
		const animes = await getAnime()
		let data = []
		for (const e of animes) {
			const episodes = await getEpisode(e.link_anime)
			data = [...data, ...episodes]
		}
		// const data = await model.getAll()
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: `${error.message}` }, { status: 500 })
	}
}

export const POST = async (request) => {
	try {
		const animes = await getAnime()
		let rawdata = []
		for (const e of animes) {
			const episodes = await getEpisode(e.link_anime)
			rawdata = [...rawdata, ...episodes]
		}
		const epsdd = await model.getAll()
		const data = []
		for (const e of rawdata) {
			const indb = epsdd.filter((d) => d.id_episode == e.id_episode)
			if (indb.length == 0) {
				// console.log(e.id_episode)
				data.push(await model.upsert(e))
			}
		}
		// const data = [
		// 	{
		// 		rawdata: rawdata.length,
		// 		data: epsdd.length,
		// 	},
		// ]
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		console.log(error)
		console.log(error.message)
		return NextResponse.json({ error: `${error.message}` }, { status: 500 })
	}
}

export const PUT = async (request) => {
	try {
		const animes = await animeModel.getOngoing()
		let rawdata = []
		for (const e of animes) {
			const episodes = await getEpisode(e.link_anime)
			rawdata = [...rawdata, ...episodes]
		}
		const data = []
		for (const e of rawdata) {
			data.push(await model.upsert(e))
		}
		// const data = await model.getAll()
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: `${error.message}` }, { status: 500 })
	}
}

export const PATCH = async (request) => {
	try {
		const animes = await animeModel.getAll()
		// let rawdata = []
		// for (const e of animes) {
		// 	const episodes = await getEpisode(e.link_anime)
		// 	rawdata = [...rawdata, ...episodes]
		// }
		// const data = []
		// for (const e of rawdata) {
		// 	data.push(await model.upsert(e))
		// }
		const rawdata = await model.getAll()
		const data = []
		for (const e of rawdata) {
			const { link_anime } = animes.find((d) => d.id_anime == e.id_anime)
			const link_epsiode = `${link_anime}_${e.id_eps}`
			// console.log(link_epsiode)
			const edit = await model.edit({ id_episode: e.id_episode }, { link: link_epsiode })
			data.push({
				old: e.link,
				new: link_epsiode,
				data: edit,
			})
		}
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: `${error.message}` }, { status: 500 })
	}
}
