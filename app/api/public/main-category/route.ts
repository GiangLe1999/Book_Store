import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import MainCategory from "@/models/MainCategory";
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

    const mainCategory = await MainCategory.findOne({ slug })
      .select("name description subCategories")
      .populate({
        path: "books",
        model: Book,
        select: "name slug cover createdAt",
        options: { sort: { createdAt: -1 }, limit: 4 },
      });

    if (!mainCategory) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy danh mục" });
    }

    const bookQuantity = await Book.countDocuments({
      mainCategory: mainCategory._id,
    });

    return NextResponse.json({
      ok: true,
      mainCategory,
      bookQuantity,
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
