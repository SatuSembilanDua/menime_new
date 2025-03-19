const api_url = process.env.NEXT_PUBLIC_API_URL

export const getMetaApi = async () => {
	const url = `${api_url}/meta.json`
	console.log(`fetch ${url}`)
	const response = await fetch(url, { cache: "no-store" })
	const data = await response.json()
	return data
}

export const getAnime = async () => {
	const url = `${api_url}/anime.json`
	console.log(`fetch ${url}`)
	const response = await fetch(url, { cache: "no-store" })
	const data = await response.json()
	return parseAnime(data)
}

export const parseAnime = (data) => {
	return data
		.map((e) => ({
			id_anime: e.id_anime,
			judul_anime: e.judul_anime,
			link_anime: e.link_anime,
			origin: e.origin,
			sts: Number(e.sts),
			src: Number(e.src),
			img: e.img,
			studio: e.studio,
			season: e.season,
			tags: e.tags,
			ket_sts: Number(e.ket_sts),
			display: Number(e.display),
			gambar: e.gambar,
		}))
		.filter((e) => !["one_piece_special", "one_piece_ova", "one_piece_movie"].includes(e.link_anime))
}

export const getEpisode = async (slug) => {
	const url = `${api_url}/${slug}.json`
	// const url = `http://localhost/js/tmp/${slug}.json`
	console.log(`fetch ${url}`)
	const response = await fetch(url, { cache: "no-store" })
	const data = await response.json()
	return parseEpisodes(data)
}

const parseEpisodes = ({ anime, episodes }) => {
	const data = []
	for (let episode of episodes) {
		let eps = anime.ket_sts == "3" ? `${episode.book} - ${episode.eps}` : episode.eps
		let link = `${anime.link_anime}_${episode.id_eps}`
		data.push({
			id_episode: episode.id_episode,
			id_anime: episode.id_anime,
			link: link,
			eps: eps,
			judul: episode.judul,
			date: episode.date,
			id_eps: Number(episode.id_eps),
			vid: episode.vid,
		})
	}
	return data
}
