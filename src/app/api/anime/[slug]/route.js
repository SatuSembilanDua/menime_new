import { apiResonse } from "@/lib/apiroute"
import { animeModel as model } from "@/lib/repo"

export const GET = async (request, { params }) => {
	const { slug } = await params
	return apiResonse(() => model.getWhere({ link_anime: slug }))
}
