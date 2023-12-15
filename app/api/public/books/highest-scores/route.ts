import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const books = await Book.find()
      .select("name slug cover ratings views createdAt")
      .limit(5)
      .sort({ views: -1 });

    return NextResponse.json({ ok: true, books });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
