import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { CreateBookInput } from "@/dtos/book/create-book.dto";
import Book from "@/models/Book";
import MainCategory from "@/models/MainCategory";
import SubCategory from "@/models/SubCategory";
import { EditBookInput } from "@/dtos/book/edit-book.dto";
export const dynamic = "force-dynamic";
import cloudinary from "cloudinary";

export async function POST(req: Request) {
  try {
    const body: CreateBookInput = await req.json();

    const {
      name,
      slug,
      description,
      downloadLink,
      cover,
      authorId,
      mainCategoryId,
      subCategoryId,
      content,
      tags,
    } = body;

    if (
      !name ||
      !slug ||
      !description ||
      !content ||
      !authorId ||
      !downloadLink
    ) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu thông tin cần thiết",
      });
    }

    let savedCover = { public_id: "", url: "" };
    if (cover) {
      const processedImage = await editCloudinaryImage(cover);
      if (processedImage) {
        savedCover = {
          public_id: processedImage.public_id,
          url: processedImage.secure_url,
        };
      }
    }

    await dbConnect();

    const book = await Book.create({
      name,
      slug,
      description,
      content,
      ...(savedCover && { cover: savedCover }),
      downloadLink,
      ...(mainCategoryId && { mainCategory: mainCategoryId }),
      ...(subCategoryId && { subCategory: subCategoryId }),
      author: authorId,
      tags,
    });

    if (mainCategoryId) {
      const mainCategory = await MainCategory.findById(mainCategoryId).select(
        "books"
      );
      if (mainCategory) {
        mainCategory?.books?.push(book._id as any);
        await mainCategory.save();
      }
    }

    if (subCategoryId) {
      const subCategory = await SubCategory.findById(subCategoryId).select(
        "books"
      );
      if (subCategory) {
        subCategory?.books?.push(book._id as any);
        await subCategory.save();
      }
    }

    const user = await User.findById(authorId).select("books");
    if (user) {
      user.books.push(book._id as any);
      await user.save();
    }

    return NextResponse.json(
      {
        ok: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body: EditBookInput = await req.json();

    const {
      name,
      slug,
      description,
      downloadLink,
      cover,
      mainCategoryId,
      subCategoryId,
      content,
      tags,
      bookId,
    } = body;

    if (!bookId || !name || !slug || !description || !content) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số cần thiết",
      });
    }

    await dbConnect();

    const book = await Book.findById(bookId);

    if (!book) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy sách phù hợp!",
      });
    }

    // Main Category
    const mainCategory: any = await MainCategory.findById(
      book?.mainCategory?.toString()
    ).select("books");

    if (mainCategory) {
      const bookIndex = mainCategory.books.findIndex((r: any) => {
        return r.toString() === bookId;
      });

      if (bookIndex !== -1) {
        mainCategory.books.splice(bookIndex, 1);
        mainCategory.save();
      }
    }

    if (mainCategoryId) {
      const newMainCategory = await MainCategory.findById(
        mainCategoryId
      ).select("books");

      if (!newMainCategory) {
        return NextResponse.json({
          ok: false,
          error: "Không tìm thấy danh mục lớn",
        });
      } else {
        newMainCategory?.books?.push(bookId as any);
        newMainCategory.save();
      }
    }

    // Sub Category
    const subCategory: any = await SubCategory.findById(
      book?.subCategory?.toString()
    ).select("books");

    if (subCategory) {
      const bookIndex = subCategory.books.findIndex((r: any) => {
        return r.toString() === bookId;
      });

      if (bookIndex !== -1) {
        subCategory.books.splice(bookIndex, 1);
        subCategory.save();
      }
    }

    if (subCategoryId) {
      const newSubCategory = await SubCategory.findById(subCategoryId).select(
        "books"
      );
      if (!newSubCategory) {
        return NextResponse.json({
          ok: false,
          error: "Không tìm thấy danh mục con",
        });
      } else {
        newSubCategory?.books?.push(bookId as any);
        newSubCategory.save();
      }
    }

    const newCover = await editCloudinaryImage(cover, book.cover);
    if (newCover) {
      book.cover = {
        public_id: newCover.public_id,
        url: newCover.secure_url,
      };
    }

    book.name = name;
    book.slug = slug;
    book.downloadLink = downloadLink;
    book.description = description;
    book.content = content;

    if (tags) {
      book.tags = tags;
    }

    if (mainCategoryId) {
      book.mainCategory = mainCategoryId as any;
    }

    if (subCategoryId) {
      book.subCategory = subCategoryId as any;
    }

    await book.save();

    return NextResponse.json(
      {
        ok: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số id của sách",
      });
    }

    await dbConnect();

    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy sách cần xóa",
      });
    }

    if (book.cover.public_id) {
      await cloudinary.v2.uploader.destroy(book.cover.public_id);
    }

    // Main Category
    if (book.mainCategory) {
      const mainCategory: any = await MainCategory.findById(
        book.mainCategory.toString()
      ).select("books");

      if (mainCategory) {
        const bookIndex = mainCategory.books.findIndex((r: any) => {
          return r.toString() === id;
        });

        mainCategory.books.splice(bookIndex, 1);
        mainCategory.save();
      }
    }

    // Sub Category
    if (book.subCategory) {
      const subCategory: any = await SubCategory.findById(
        book.subCategory.toString()
      ).select("books");

      if (subCategory) {
        const bookIndex = subCategory.books.findIndex((r: any) => {
          return r.toString() === id;
        });

        subCategory.books.splice(bookIndex, 1);
        subCategory.save();
      }
    }

    // User
    const user: any = await User.findById(book.author.toString()).select(
      "books"
    );

    if (user) {
      const bookIndex = user.books.findIndex((r: any) => {
        return r.toString() === id;
      });

      user.books.splice(bookIndex, 1);
      user.save();
    }

    await Book.deleteOne({ _id: id });

    return NextResponse.json({
      ok: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message,
    });
  }
}
