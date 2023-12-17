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
      .select("name slug cover createdAt tags views ratings")
      .sort({ createdAt: -1 });

    const savedAllBooks = JSON.parse(JSON.stringify(allBooks));

    allBooks.forEach((book) => {
      book.tags = book.tags.map((tag) => slugify(tag, { lower: true }));
    });

    let tagIndex = 0;
    let bookIndex = 0;

    const sameTagBooks = allBooks.filter((book, index) => {
      if (slug && book.tags.includes(slug)) {
        tagIndex = book.tags.findIndex((tag) => tag === slug);
        bookIndex = index;
        return book;
      }
    });

    const books = sameTagBooks.slice(skip, skip + limit);

    const totalPages = Math.ceil(sameTagBooks.length / limit);

    return NextResponse.json({
      ok: true,
      books,
      totalPages,
      tagName: savedAllBooks[bookIndex].tags[tagIndex],
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
