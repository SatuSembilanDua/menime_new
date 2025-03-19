import { NextRequest, NextResponse } from "next/server"
import { animeModel as model } from "@/lib/repo"
import { getAnime } from "@/lib/perapian"

export const GET = async (request) => {
	try {
		const data = await getAnime()
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: `${error.message}` }, { status: 500 })
	}
}

export const POST = async (request) => {
	try {
		const rawdata = await getAnime()
		const data = []
		for (const e of rawdata) {
			data.push(await model.upsert(e))
		}
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		console.log(error)
		console.log(error.message)
		return NextResponse.json({ error: `${error.message}` }, { status: 500 })
	}
}
