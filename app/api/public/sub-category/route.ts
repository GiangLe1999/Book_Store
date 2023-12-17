import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import MainCategory from "@/models/MainCategory";
import SubCategory from "@/models/SubCategory";
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

    const subCategory = await SubCategory.findOne({ slug })
      .select("name description subCategories")
      .populate([
        {
          path: "mainCategory",
          model: MainCategory,
          select: "name",
        },
        {
          path: "books",
          model: Book,
          select: "name slug cover createdAt views ratings",
          options: { sort: { createdAt: -1 }, limit: 4 },
        },
      ]);

    if (!subCategory) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy danh mục" });
    }

    const bookQuantity = await Book.countDocuments({
      subCategory: subCategory._id,
    });

    return NextResponse.json({
      ok: true,
      subCategory,
      bookQuantity,
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
