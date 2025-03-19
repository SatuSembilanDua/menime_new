"use client"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { SERVER_URL } from "@/lib/constants"

const ProgressBar = () => {
	const [progress, setProgress] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()
	const searchParams = useSearchParams()
	// const router = useRouter()

	useEffect(() => {
		const handleRouteChangeStart = () => {
			setIsLoading(true)
			setProgress(0)
			const interval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 90) {
						clearInterval(interval)
						return prev
					}
					return prev + 5
				})
			}, 500)
		}

		const handleRouteChangeComplete = () => {
			setProgress(100)
			setTimeout(() => {
				setIsLoading(false)
			}, 300)

			const pageTitle = document.title
			const url = SERVER_URL + pathname
			console.log(url, pageTitle)
			saveHistory(url, pageTitle)
		}
		const linkingElements = document.querySelectorAll(".linking")
		linkingElements.forEach((element) => {
			element.addEventListener("click", handleRouteChangeStart)
		})
		// handleRouteChangeStart()
		const timeout = setTimeout(handleRouteChangeComplete, 1000)
		return () => {
			linkingElements.forEach((element) => {
				element.removeEventListener("click", handleRouteChangeStart)
			})
			clearTimeout(timeout)
		}
		// }, [pathname, searchParams, router])
	}, [pathname, searchParams])
	// }, [])

	if (!isLoading) return null

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-1 z-50">
				<div className="h-full bg-primary transition-all duration-300 ease-in-out" style={{ width: `${progress}%` }} />
			</div>
		</>
	)
}

const saveHistory = async (url, pageTitle) => {
	// const response = await fetch("/api/riwayat", {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// 	body: JSON.stringify({ url, pageTitle }),
	// })
	const response = await fetch("/api/riwayat", {
		method: "POST",
		body: JSON.stringify({ link: url, title: pageTitle }),
	})

	if (!response.ok) {
		console.error("Failed to save navigation data")
	}
}

export default ProgressBar
