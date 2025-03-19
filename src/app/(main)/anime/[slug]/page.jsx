import ButtonSort from "@/components/shared/button-sort"
import EpisodeList from "@/components/shared/episode-list"
import { PageKey } from "@/components/shared/nav-key"
import PageTitle from "@/components/shared/page-title"
import Pagination from "@/components/shared/pagination"
import Search from "@/components/shared/search"
import { EpisodeSkeleton } from "@/components/shared/skeletons"
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants"
import { animeModel, episodeModel } from "@/lib/repo"
import { Suspense } from "react"

export const generateMetadata = async ({ params }) => {
	const { slug } = await params
	const data = await animeModel.getWhere({ link_anime: slug })
	const judul = data.judul_anime
	const deskripsi = `Nonton ${data.judul_anime}. ${APP_DESCRIPTION}`
	const url = `${SERVER_URL}/anime/${slug}`
	return {
		title: judul,
		description: deskripsi,
		openGraph: {
			siteName: APP_NAME,
			title: judul,
			description: deskripsi,
			url: new URL(url),
			locale: "id_ID",
			type: "website",
			images: [
				{
					url: `${new URL(data.img)}`,
					with: 225,
					height: 350,
					alt: judul,
				},
			],
		},
	}
}

const AnimePage = async ({ params, searchParams }) => {
	const { slug } = await params

	const anime = await animeModel.getWhere({ link_anime: slug })

	const csp = await searchParams
	const query = csp?.query || ""
	const currentPage = Number(csp?.page) || 1
	let sort = csp?.sort || false
	sort = anime.sts == 0 ? !sort : sort
	const order = { id_eps: sort ? "desc" : "asc" }
	const where = { id_anime: anime.id_anime }
	const data = await episodeModel.getSearchPaginWhere(where, query, currentPage, order)
	const totalPage = await episodeModel.getPageWhere(where, query)
	// console.log(currentPage, totalPage)
	return (
		<>
			<Suspense key={slug} fallback={<EpisodeSkeleton />}>
				<PageTitle>{anime.judul_anime.toUpperCase()}</PageTitle>
				<div className="my-2 grid grid-cols-2 gap-2 border-b-2 border-solid border-white/70 py-2 text-black">
					<div>
						<ButtonSort />
					</div>
					<div>
						<Search />
					</div>
				</div>
				<div className="mb-5 pr-2">
					{data.map((item) => (
						<EpisodeList item={item} key={item.id_eps} />
					))}
				</div>
				<div className="flex justify-center mt-4">
					<Pagination totalPages={totalPage} />
				</div>
				<PageKey totalPage={totalPage} />
			</Suspense>
		</>
	)
}

export default AnimePage
