import { ArrowFatLeft, CaretDoubleLeft, CaretDoubleRight, ListIcon } from "@/components/graphics/graphics"
import ModalEpisode from "@/components/shared/modal-episode"
import { NavKey } from "@/components/shared/nav-key"
import { ViewEpisodeSkeleton } from "@/components/shared/skeletons"
import { LinkButton } from "@/components/ui/button"
import Iframe from "@/components/ui/iframe"
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants"
import { episodeModel } from "@/lib/repo"
import { Suspense } from "react"

export const generateMetadata = async ({ params }) => {
	const { slug } = await params
	const { data } = await episodeModel.getEpisode(slug)
	const judul = `${data.Anime.judul_anime} - ${data.eps} - ${data.judul}`
	const deskripsi = `Nonton ${judul}. ${APP_DESCRIPTION}`
	const url = `${SERVER_URL}/episode/${slug}`
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
					url: `${new URL(data.Anime.img)}`,
					with: 225,
					height: 350,
					alt: judul,
				},
			],
		},
	}
}

const ViewEpisodePage = async ({ params }) => {
	const { slug } = await params
	const { prev, data: episode, next } = await episodeModel.getEpisode(slug)
	// console.log(episodes)
	return (
		<>
			<Suspense fallback={<ViewEpisodeSkeleton />}>
				<div className="t-0 l-0 absolute h-dvh w-dvw">
					<Iframe className="w-full h-full" src={episode.vid} allowFullScreen={true} />
				</div>
				<div className="t-0 l-0 absolute z-40 w-screen">
					<div className="flex items-center justify-between gap-4 text-primary px-8 py-4 hover:bg-black/40 transition-all duration-300 ease-in-out">
						<div className="flex gap-2">
							<LinkButton href={`/anime/${episode.Anime?.link_anime}`} className="linking">
								<ArrowFatLeft width={24} height={24} />
							</LinkButton>
							<LinkButton href={prev == null ? "#" : `/episode/${prev}`} className="linking">
								<CaretDoubleLeft width={24} height={24} />
							</LinkButton>
							<LinkButton href={next == null ? "#" : `/episode/${next}`} className="linking">
								<CaretDoubleRight width={24} height={24} />
							</LinkButton>
						</div>
						<div>
							<h1 className="text-white">{`${episode.eps} - ${episode.judul}`}</h1>
						</div>
						<div>
							<ModalEpisode anime={episode.Anime} slug={slug} />
						</div>
					</div>
				</div>
				<NavKey next={next} prev={prev} />
			</Suspense>
		</>
	)
}

export default ViewEpisodePage
