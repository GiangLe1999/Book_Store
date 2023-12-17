import slugify from "slugify";
import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    let skip = (page - 1) * limit;

    await dbConnect();

    let allBooks = await Book.find()
      .select("name slug cover createdAt publisher views ratings")
      .sort({ createdAt: -1 });

    const booksOfPublisher = allBooks.filter((book) => {
      const bookPublisher = slugify(book.publisher || "", { lower: true });
      return bookPublisher === slug;
    });

    const books = booksOfPublisher.slice(skip, skip + limit);

    const totalPages = Math.ceil(booksOfPublisher.length / limit);

    return NextResponse.json({ ok: true, books, totalPages });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
