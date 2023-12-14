import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import SubCategory from "@/models/SubCategory";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mainCategoryId = searchParams.get("mainCategoryId");

    await dbConnect();

    let subCategories = await SubCategory.find({
      mainCategory: mainCategoryId,
    })
      .select("name slug books")
      .sort({ createdAt: -1 });

    return NextResponse.json({ ok: true, subCategories });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
