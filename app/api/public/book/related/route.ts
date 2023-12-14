import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const currentId = searchParams.get("currentId");

    await dbConnect();

    const books = await Book.find({
      subCategory: categoryId,
      _id: { $ne: currentId },
    })
      .select("name slug cover createdAt")
      .limit(4)
      .sort({
        updatedAt: -1,
      });
    const relatedBooks = books.filter(
      (book: any) => book._id.toString() !== currentId
    );

    return NextResponse.json({ ok: true, books: relatedBooks });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
