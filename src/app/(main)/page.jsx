import HomePage from "@/components/shared/home-page"
import { AnimesSkeleton } from "@/components/shared/skeletons"
import { animeModel } from "@/lib/repo"
import { Suspense } from "react"

const Home = async () => {
	const data = await animeModel.getAll()
	return (
		<>
			<div className="grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-6">
				<Suspense key={data} fallback={<AnimesSkeleton />}>
					<HomePage data={data} />
				</Suspense>
			</div>
		</>
	)
}

export default Home
