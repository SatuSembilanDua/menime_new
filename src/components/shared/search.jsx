"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

const Search = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams)
		params.set("page", "1")
		if (term) {
			params.set("query", term)
		} else {
			params.delete("query")
		}
		replace(`${pathname}?${params.toString()}`)
	}, 300)

	return (
		<>
			<input
				type="search"
				id="search-navbar"
				className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-5 text-sm focus:border-blue-500 focus:ring-blue-500"
				placeholder="Search..."
				onChange={(e) => handleSearch(e.target.value)}
				defaultValue={searchParams.get("query")?.toString()}
			/>
		</>
	)
}

export default Search
