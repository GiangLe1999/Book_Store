import dbConnect from "@/lib/db";
import MainCategory from "@/models/MainCategory";
import SubCategory from "@/models/SubCategory";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const mainCategories = await MainCategory.find()
      .select("name slug")
      .populate({
        path: "subCategories",
        model: SubCategory,
        select: "name slug",
      })
      .sort({ createdAt: 1 });

    const numOfSubCategories = await SubCategory.countDocuments();

    return NextResponse.json({ ok: true, mainCategories, numOfSubCategories });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
