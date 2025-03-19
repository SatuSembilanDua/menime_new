"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SortAscending, SortDescending } from "../graphics/graphics"

const ButtonSort = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const sort = searchParams.get("sort") || false

	const handleSort = () => {
		const params = new URLSearchParams(searchParams)
		params.set("page", "1")
		if (sort) {
			params.delete("sort")
		} else {
			params.set("sort", true)
		}
		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<>
			<button
				onClick={() => handleSort()}
				className="flex items-center justify-center rounded-sm bg-white px-8 py-1 active:bg-white/35"
			>
				Sort&nbsp;
				{sort ? <SortDescending width={16} height={16} /> : <SortAscending width={16} height={16} />}
			</button>
		</>
	)
}

export default ButtonSort
