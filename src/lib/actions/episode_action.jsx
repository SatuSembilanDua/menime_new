"use server"
import { episodeModel } from "../repo"

export const getAllEpisode = async (anime) => {
	try {
		const data = await episodeModel.getAllWhere({ id_anime: anime.id_anime }, anime.sts)
		if (anime.sts != "0") {
			data.reverse()
		}
		return data
	} catch (error) {
		console.error("Error fetching series:", error)
		return []
	}
}
