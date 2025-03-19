import { apiResonse } from "@/lib/apiroute"
import { animeModel as model } from "@/lib/repo"

export const GET = async (request) => {
	return apiResonse(() => model.getAll())
}
