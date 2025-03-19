import { apiResonse } from "@/lib/apiroute"
import { episodeModel as model, animeModel } from "@/lib/repo"

export const GET = async (request, { params }) => {
	const { slug } = await params
	const data = await model.getEpisode(slug)
	return apiResonse(() => data)
}
