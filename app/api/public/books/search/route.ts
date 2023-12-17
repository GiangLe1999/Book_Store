import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const skip = (page - 1) * limit;

    await dbConnect();

    const numberOfResults = await Book.countDocuments({
      $text: { $search: query as string },
    });

    const books = await Book.find({
      $text: { $search: query as string },
    })
      .select("name slug cover createdAt views ratings")
      .skip(skip)
      .limit(limit)
      .sort({ views: -1 });

    const totalPages = Math.ceil(numberOfResults / limit);

    return NextResponse.json({
      ok: true,
      books,
      totalPages,
      numberOfResults,
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
