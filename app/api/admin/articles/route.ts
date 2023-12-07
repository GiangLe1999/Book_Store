import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import Article from "@/models/Article";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const articles = await Article.find().select("name slug views updatedAt");

    return NextResponse.json({ ok: true, articles });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
