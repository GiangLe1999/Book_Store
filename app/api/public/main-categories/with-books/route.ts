import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import MainCategory from "@/models/MainCategory";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const mainCategories = await MainCategory.find(
      {},
      {
        books: { $slice: [0, 10] },
      }
    )
      .select("name slug books")
      .populate({
        path: "books",
        model: Book,
        select: "name slug cover",
        options: { sort: { createAt: -1 } },
      })
      .sort({ createdAt: 1 });

    return NextResponse.json({ ok: true, mainCategories });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
