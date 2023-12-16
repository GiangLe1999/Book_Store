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
        createdAt: -1,
      });

    return NextResponse.json({ ok: true, books });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
