import { getNowforDB } from "@/lib/utils";
import { addRiwayat, RiwayatAddType } from "@/server/riwayat";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userAgent = request.headers.get("user-agent");
    const forwarded = request.headers.get("x-forwarded-for");
    const ipAddress = forwarded?.split(",")[0]?.trim() ?? null;
    const desc = {
      ip: ipAddress,
      userAgent: userAgent,
    };
    const value: RiwayatAddType = {
      link: body.fullUrl ?? "/",
      title: body.title ?? "Menime",
      desc: btoa(JSON.stringify(desc)),
      updatedAt: getNowforDB(),
    };
    const add = await addRiwayat(value);
    if (!add) {
      return Response.json({ success: false }, { status: 500 });
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
