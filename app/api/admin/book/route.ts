import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { CreateBookInput } from "@/dtos/book/create-book.dto";
import Book from "@/models/Book";
import MainCategory from "@/models/MainCategory";
import SubCategory from "@/models/SubCategory";
export const dynamic = "force-dynamic";

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
