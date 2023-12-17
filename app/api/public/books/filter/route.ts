import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mainCategoryId = searchParams.get("mainCategoryId");
    const subCategoryId = searchParams.get("subCategoryId");
    const sortBy = searchParams.get("sortBy");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    let skip = (page - 1) * limit;

    await dbConnect();

    let filterObj = {};

    if (mainCategoryId) {
      filterObj = { mainCategory: mainCategoryId };
    }

    if (subCategoryId) {
      filterObj = { subCategory: subCategoryId };
    }

    const sortByObj: any =
      sortBy === "view"
        ? { views: -1 }
        : sortBy === "ratings"
        ? { ratings: -1 }
        : sortBy === "newest"
        ? { createdAt: -1 }
        : sortBy === "oldest"
        ? { createdAt: 1 }
        : {};

    const numberOfResults = await Book.countDocuments(filterObj);

    const books = await Book.find(filterObj)
      .select("name slug cover createdAt views ratings")
      .skip(skip)
      .limit(limit)
      .sort(sortByObj);

    const totalPages = Math.ceil(numberOfResults / limit);

    return NextResponse.json({ ok: true, books, totalPages });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
