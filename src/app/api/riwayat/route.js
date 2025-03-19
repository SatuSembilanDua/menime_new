import { apiResonse } from "@/lib/apiroute"
import { HistoryModel as model } from "@/lib/repo"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request) => {
	return apiResonse(() => model.getAll())
}

export const POST = async (request) => {
	try {
		// console.log("Riwayat")
		const body = await request.json()
		const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
		const userAgent = request.headers.get("user-agent") || "unknown"
		const riwayat = await model.add({
			link: body.link,
			title: body.title == "/" ? "Menime" : body.title,
			desc: btoa(
				JSON.stringify({
					ip,
					userAgent,
				})
			),
		})
		// const riwayat = {}
		return NextResponse.json(riwayat, { status: 200 })
	} catch (error) {
		console.log(error)
		return new Response("Failed to fetch all anime", { status: 500 })
	}
}
