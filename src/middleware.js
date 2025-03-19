import { NextResponse } from "next/server"
// import { HistoryModel } from "./lib/repo"

export async function middleware(request) {
	const pathname = request.nextUrl.pathname
	if (/^\/api\/riwayat(\/.*)?$/.test(pathname)) {
		return NextResponse.next()
	}
	const postData = {
		link: request.url,
		title: pathname,
		desc: {
			ip: request.headers.get("x-forwarded-for"),
			uag: request.headers.get("user-agent"),
			geo: request.geo,
		},
	}
	console.log(postData)
	const url = `${request.nextUrl.origin}/api/riwayat`
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(postData),
	})
	return NextResponse.next()
}

export const config = {
	matcher: ["/api/:path*"],
}
