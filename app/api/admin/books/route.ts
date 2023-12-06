import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import Book from "@/models/Book";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const books = await Book.find().select("name slug views updatedAt");

    return NextResponse.json({ ok: true, books });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
