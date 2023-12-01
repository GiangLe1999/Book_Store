import dbConnect from "@/lib/db";
import MainCategory from "@/models/MainCategory";
import { NextResponse } from "next/server";
import SubCategory from "@/models/SubCategory";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");
    const limit = searchParams.get("limit");
    const willPopulate = searchParams.get("willPopulate");
    const populatedProps = searchParams.get("populatedProps");

    await dbConnect();

    let mainCategories;
    if (willPopulate === "false") {
      mainCategories = await MainCategory.find()
        .select(specifiedProps || "")
        .limit(Number(limit) || 0);
    } else if (willPopulate === "true") {
      mainCategories = await MainCategory.find()
        .select(specifiedProps || "")
        .limit(Number(limit) || 0)
        .populate({
          path: "subCategories",
          model: SubCategory,
          select: populatedProps,
        });
    }

    return NextResponse.json({ ok: true, mainCategories });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
