import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import MainCategory from "@/models/MainCategory";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const mainCategories = await MainCategory.find()
      .select("name slug books")
      .populate({
        path: "books",
        model: Book,
        select: "name slug cover createdAt",
        options: { sort: { createdAt: -1 }, limit: 10 },
      })
      .sort({ createdAt: 1 });

    return NextResponse.json({ ok: true, mainCategories });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
