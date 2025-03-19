"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const NavKey = ({ next, prev }) => {
	const KEYS = ["91", "[", "93", "]"]
	const router = useRouter()
	// const savedHandler = useRef()
	const handler = ({ key }) => {
		if (KEYS.includes(String(key))) {
			if (key == "]") {
				router.push(`/episode/${next}`)
			}
			if (key == "[") {
				router.push(`/episode/${prev}`)
			}
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", handler)
		return () => {
			window.removeEventListener("keydown", handler)
		}
	}, [])
	return <></>
}

export const PageKey = ({ totalPage }) => {
	const KEYS = ["ArrowLeft", "ArrowRight"]
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()
	const currentPage = Number(searchParams.get("page")) || 1
	const createPageURL = (pageNumber) => {
		const params = new URLSearchParams(searchParams)
		params.set("page", pageNumber.toString())
		return `${pathname}?${params.toString()}`
	}

	const handler = ({ key }) => {
		if (KEYS.includes(String(key))) {
			if (key == "ArrowLeft") {
				if (currentPage > 1) {
					const link = createPageURL(currentPage - 1)
					router.push(link)
				}
			}
			if (key == "ArrowRight") {
				if (currentPage < totalPage) {
					const link = createPageURL(currentPage + 1)
					router.push(link)
				}
			}
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", handler)
		return () => {
			window.removeEventListener("keydown", handler)
		}
	}, [currentPage])
}

// export default NavKey
