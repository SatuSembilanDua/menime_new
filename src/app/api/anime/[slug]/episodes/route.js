import { apiResonse } from "@/lib/apiroute"
import { episodeModel as model, animeModel } from "@/lib/repo"

export const GET = async (request, { params }) => {
	const { slug } = await params
	const anime = await animeModel.getForEpisode(slug)
	if (anime == null) {
		return apiResonse(
			() => ({
				error: "Anime not found!",
			}),
			404
		)
	}
	let page = request.nextUrl.searchParams.get("page")
	let query = request.nextUrl.searchParams.get("query")
	let sort = request.nextUrl.searchParams.get("sort")
	page = page == null ? 1 : Number(page)
	query = query == null ? "" : query
	sort = sort == null ? false : sort == "1" ? true : false // false : ASC, true: DESC
	sort = anime.sts == 0 ? !sort : sort
	const where = { id_anime: anime.id_anime }
	const order = { id_eps: sort ? "desc" : "asc" }
	const data = {
		data: await model.getSearchPaginWhere(where, query, page, order),
		pagination: {
			current_page: page,
			pages: await model.getPageWhere(where, query),
		},
		search_query: query,
		order: order,
	}
	// const data = await model.getSearchPaginWhere({ id_anime: anime.id_anime }, query, page, {
	// 	id_eps: sort ? "desc" : "asc",
	// })
	return apiResonse(() => data)
}
