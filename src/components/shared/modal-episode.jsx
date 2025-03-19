"use client"
import { useEffect, useRef, useState } from "react"
import { CloseIcon, ListIcon, Loading } from "../graphics/graphics"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { getAllEpisode } from "@/lib/actions/episode_action"
import EpisodeList from "./episode-list"

const ModalEpisode = ({ anime, slug }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const listRef = useRef(null)
	const itemRefs = useRef([])

	const toogleModal = () => {
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		const getEpisode = async () => {
			setLoading(true)
			const episode = await getAllEpisode(anime)
			setData(episode)
			setLoading(false)
		}
		if (isOpen && data.length == 0) {
			getEpisode()
		}
	}, [isOpen, data])

	useEffect(() => {
		if (data.length > 0 && !loading) {
			const indexScrl = itemRefs.current.findIndex((e) => e.classList.contains("active"))
			itemRefs.current[indexScrl].scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			})
		}
	}, [data, loading])

	const LoadingBox = () => {
		return (
			<>
				<div className="flex justify-center items-center">
					<Loading className="w-40" />
				</div>
			</>
		)
	}

	const ListEpisode = ({ data, slug }) => {
		return (
			<>
				<div className="mb-5 pr-2" ref={listRef}>
					{data.map((item, index) => {
						const isActive = slug == item.link
						// if (isActive) setScrollIndex(index)
						return (
							<div
								key={item.id_episode}
								ref={(el) => (itemRefs.current[index] = el)}
								className={cn(isActive && "active")}
							>
								<EpisodeList item={item} isDark={false} isActive={isActive} />
							</div>
						)
					})}
				</div>
			</>
		)
	}

	return (
		<>
			<Button onClick={() => toogleModal()}>
				<ListIcon width={32} height={32} />
			</Button>
			<div className={cn(isOpen ? "block" : "hidden")}>
				<div
					className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center"
					onClick={() => toogleModal()}
				>
					<div className="bg-background w-1/2 h-1/2 rounded-md">
						<div className="px-4 py-2 border-b-2 flex justify-between items-center">
							<h3>List Episode</h3>
							<Button onClick={() => toogleModal()}>
								<CloseIcon width={16} height={16} />
							</Button>
						</div>
						<div className="p-2 overflow-y-auto h-5/6">
							{loading ? <LoadingBox /> : <ListEpisode data={data} slug={slug} />}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ModalEpisode
