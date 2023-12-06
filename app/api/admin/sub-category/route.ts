import { CreateMainCategoryInput } from "@/dtos/main-category/create-main-category.dto";
import { CreateSubCategoryInput } from "@/dtos/sub-category/create-sub-category.dto";
import dbConnect from "@/lib/db";
import MainCategory from "@/models/MainCategory";
import SubCategory from "@/models/SubCategory";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body: CreateSubCategoryInput = await req.json();

    const { name, slug, description, mainCategory } = body;

    if (!name || !slug || !description) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số cần thiết để tạo danh mục",
      });
    }

    await dbConnect();

    const subCategory = await SubCategory.create({
      name,
      slug,
      description,
      mainCategory,
    });

    if (mainCategory) {
      const existedMainCategory = await MainCategory.findById(mainCategory);
      if (!existedMainCategory) {
        return NextResponse.json({
          ok: false,
          error: "Không tìm thấy danh mục cha",
        });
      }

      existedMainCategory.subCategories?.push(subCategory._id as any);
      existedMainCategory.save();
    }

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
    const body: CreateSubCategoryInput = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const { name, slug, description, mainCategory } = body;

    if (!id || !name || !slug || !description) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số cần thiết để sửa danh mục",
      });
    }

    await dbConnect();

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy danh mục",
      });
    }

    if (mainCategory) {
      const oldMainCategory = await MainCategory.findById(
        subCategory?.mainCategory?.toString()
      );

      if (oldMainCategory && oldMainCategory.subCategories) {
        const subCategoryIndex = oldMainCategory.subCategories.findIndex(
          (s) => s.toString() === subCategory._id.toString()
        );

        if (subCategoryIndex >= 0) {
          oldMainCategory?.subCategories?.splice(subCategoryIndex, 1);
          oldMainCategory?.save();
        }
      }

      const newMainCategory = await MainCategory.findById(mainCategory);
      newMainCategory?.subCategories?.push(id as any);
      newMainCategory?.save();

      subCategory.mainCategory = mainCategory as any;
    }

    subCategory.name = name;
    subCategory.slug = slug;
    subCategory.description = description;

    await subCategory.save();

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

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return NextResponse.json({
        ok: false,
        error: "Không tìm thấy danh mục",
      });
    }

    await SubCategory.deleteOne({ _id: id });

    const mainCategory = await MainCategory.findById(subCategory.mainCategory);

    if (mainCategory && mainCategory.subCategories) {
      const subCategoryIndex = mainCategory.subCategories?.findIndex(
        (s) => s.toString() === subCategory._id.toString()
      );

      if (subCategoryIndex >= 0) {
        mainCategory.subCategories.splice(subCategoryIndex, 1);
        mainCategory.save();
      }
    }

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
