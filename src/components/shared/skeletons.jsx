import { ArrowFatLeft, CaretDoubleLeft, CaretDoubleRight, FullScreen, ListIcon, Loading } from "../graphics/graphics"
import { Button, LinkButton } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import PageTitle from "./page-title"

export const AnimesSkeleton = () => {
	const dummy = [...Array(12).keys()]
	return (
		<>
			{dummy.map((i) => (
				<CardSkeleton key={i} />
			))}
		</>
	)
}

export const CardSkeleton = () => {
	return (
		<>
			<div className="group">
				<Skeleton className="w-full h-[40vw] rounded-xl md:h-[20vw]" />
				<Skeleton className="h-6 w-full mt-3" />
			</div>
		</>
	)
}

export const EpisodeSkeleton = () => {
	const dummy = [...Array(7).keys()]
	return (
		<>
			<PageTitle>
				<Skeleton className="h-6 w-full" />
			</PageTitle>
			<div className="my-2 grid grid-cols-2 gap-2 border-b-2 border-solid border-white/70 py-2 ">
				<Skeleton className="h-10 w-28" />
				<Skeleton className="h-10 w-full" />
			</div>
			<div className="mb-5 h-96 overflow-y-auto pr-2">
				{dummy.map((i) => (
					<RowSkeleton key={i} />
				))}
			</div>
		</>
	)
}

export const EpisodeListSkeleton = () => {
	const dummy = [...Array(10).keys()]
	return (
		<>
			{dummy.map((i) => (
				<RowSkeleton key={i} />
			))}
		</>
	)
}

export const RowSkeleton = () => {
	return (
		<>
			<div className="flex gap-2 border-b-2 border-solid border-white/40 py-1">
				<div className="flex-none basis-12">
					<Skeleton className="h-10 w-full" />
				</div>
				<div className="grow">
					<div className="flex justify-between pt-1">
						<Skeleton className="h-2 w-64" />
						<Skeleton className="h-2 w-40" />
					</div>
					<Skeleton className="h-4 w-full my-2" />
				</div>
			</div>
		</>
	)
}

export const ViewEpisodeSkeleton = () => {
	return (
		<>
			<div className="t-0 l-0 absolute z-[9996] w-screen">
				<div className="flex items-center justify-between gap-4 text-primary px-8 py-4 hover:bg-black/40 transition-all duration-300 ease-in-out">
					<div className="flex gap-2">
						<LinkButton href={"#"}>
							<ArrowFatLeft width={24} height={24} />
						</LinkButton>
						<LinkButton href={"#"}>
							<CaretDoubleLeft width={24} height={24} />
						</LinkButton>
						<LinkButton href={"#"}>
							<CaretDoubleRight width={24} height={24} />
						</LinkButton>
					</div>
					<div>
						<h1 className="text-white">
							<Skeleton className="h-4 w-96" />
						</h1>
					</div>
					<div>
						<Button>
							<FullScreen width={32} height={32} />
						</Button>
					</div>
				</div>
			</div>
			<div className="t-0 l-0 absolute h-dvh w-dvw flex items-center justify-center">
				<Loading className="w-80" />
			</div>
		</>
	)
}
