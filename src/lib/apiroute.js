import { NextRequest, NextResponse } from "next/server"

export const apiResonse = async (callback, status = 200) => {
	try {
		const data = await callback()
		return NextResponse.json(data, { status: status })
	} catch (error) {
		return NextResponse.json({ error: `${error.message}` }, { status: 500 })
	}
}
