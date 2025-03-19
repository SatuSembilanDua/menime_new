import Link from "next/link"
import { MonitorPlay } from "../graphics/graphics"
import { cn } from "@/lib/utils"

const EpisodeList = ({ item, isDark = false, isActive = false }) => {
	return (
		<>
			<Link href={`/episode/${item.link}`} className={cn("linking group", isActive && "active")}>
				<div
					className={cn(
						"flex gap-2 border-b-2 border-solid py-1 group-hover:bg-primary",
						isDark ? "text-black" : "text-white",
						isDark ? "border-black/40" : "border-white/40",
						isActive && "bg-primary text-white"
					)}
				>
					<div className="flex-none basis-12">
						<MonitorPlay
							width="40"
							height="40"
							className={cn(
								"w-full",
								isDark ? "text-black" : "text-white",
								isDark && "group-hover:text-white",
								isActive && "bg-primary text-white"
							)}
						/>
					</div>
					<div className={cn("grow", isDark && "group-hover:text-white", isActive && "bg-primary text-white")}>
						<div className="flex justify-between pt-1 text-xs">
							<p>{item.eps}</p>
							<span className="pr-2 text-white/50">{item.date}</span>
						</div>
						<h3 className="md:text-md text-sm">{item.judul}</h3>
					</div>
				</div>
			</Link>
		</>
	)
}

export default EpisodeList
