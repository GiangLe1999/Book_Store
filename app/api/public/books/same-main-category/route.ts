import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mainCategoryId = searchParams.get("mainCategoryId");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    let skip = (page - 1) * limit + 4;

    let numberOfResults = await Book.countDocuments({
      mainCategory: mainCategoryId,
    });

    await dbConnect();

    let books = await Book.find({
      mainCategory: mainCategoryId,
    })
      .select("name slug cover createdAt views ratings")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(numberOfResults / limit);

    return NextResponse.json({ ok: true, books, totalPages });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
