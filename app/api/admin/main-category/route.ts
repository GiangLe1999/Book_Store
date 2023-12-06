import { CreateMainCategoryInput } from "@/dtos/main-category/create-main-category.dto";
import dbConnect from "@/lib/db";
import MainCategory from "@/models/MainCategory";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body: CreateMainCategoryInput = await req.json();

    const { name, slug, description } = body;

    if (!name || !slug || !description) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số cần thiết để tạo danh mục",
      });
    }

    await dbConnect();

    await MainCategory.create({ name, slug, description });

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

export async function PUT(req: Request) {
  try {
    const body: CreateMainCategoryInput = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const { name, slug, description } = body;

    if (!id || !name || !slug || !description) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số cần thiết để sửa danh mục",
      });
    }

    await dbConnect();

    const category = await MainCategory.findById(id);

    if (!category) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy danh mục",
      });
    }

    category.name = name;
    category.slug = slug;
    category.description = description;

    await category.save();

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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số id của danh mục",
      });
    }

    await dbConnect();

    await MainCategory.findByIdAndDelete(id);

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
