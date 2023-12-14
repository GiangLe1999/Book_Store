import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id, rating } = await req.json();

    await dbConnect();

    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy sách tương ứng",
      });
    }

    book.ratings = Number(
      (
        (book.ratings * book.numOfRatings + Number(rating)) /
        (book.numOfRatings + 1)
      ).toFixed(2)
    );

    book.numOfRatings = book.numOfRatings + 1;

    book.save();

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
