import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const books = await Book.find().select("tags");

    let tags: string[] = [];

    books.forEach((book) => {
      book.tags.map((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });

    return NextResponse.json({ ok: true, tags });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
