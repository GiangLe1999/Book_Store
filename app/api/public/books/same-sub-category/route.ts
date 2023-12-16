import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subCategoryId = searchParams.get("subCategoryId");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    let skip = (page - 1) * limit + 4;

    let numberOfResults = await Book.countDocuments({
      subCategory: subCategoryId,
    });

    await dbConnect();

    let books = await Book.find({
      subCategory: subCategoryId,
    })
      .select("name slug cover createdAt")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(numberOfResults / limit);

    return NextResponse.json({ ok: true, books, totalPages });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
