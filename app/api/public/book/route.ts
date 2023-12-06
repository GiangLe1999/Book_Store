import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import MainCategory from "@/models/MainCategory";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Thiếu tham số slug" });
    }

    await dbConnect();

    const book = await Book.findOne({ slug }).populate([
      {
        path: "mainCategory",
        model: MainCategory,
        select: "name slug",
      },
      {
        path: "subCategory",
        model: SubCategory,
        select: "name slug",
      },
      {
        path: "author",
        model: User,
        select: "name",
      },
    ]);

    if (!slug) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy sách" });
    }

    return NextResponse.json({ ok: true, book });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
