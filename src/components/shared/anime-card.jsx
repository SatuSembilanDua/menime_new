import Image from "next/image"
import Link from "next/link"
import PlayCircle from "../graphics/PlayCircle"
import FilmStrip from "../graphics/FilmStrip"

const AnimeCard = ({ data }) => {
	return (
		<>
			<div className="group">
				<div className="relative h-[40vw] overflow-hidden rounded-xl md:h-[20vw]">
					<Link href={`/anime/${data.link_anime}`} className="linking">
						<Image
							src={data.gambar}
							width={126}
							height={196}
							alt={data.id_anime}
							className="h-full min-w-full transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:blur-sm"
						/>
						<div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center bg-black/50 text-white transition-all duration-1000 ease-in-out group-hover:flex">
							<PlayCircle width={56} height={56} />
						</div>
						{data.sts == "0" && (
							<div className="absolute left-0 top-0 bg-primary px-2 py-1 text-xs text-white">ONGOING</div>
						)}
					</Link>
				</div>
				<div className="flex items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap text-primary">
					<div className="mr-1">
						<FilmStrip width={18} height={18} />
					</div>
					<div>
						<Link href={`/anime/${data.link_anime}`} aria-label={data.judul_anime}>
							<p className="text-md text-white">{data.judul_anime}</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default AnimeCard
