import dbConnect from "@/lib/db";
import MainCategory from "@/models/MainCategory";
import SubCategory from "@/models/SubCategory";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const specifiedProps = searchParams.get("specifiedProps");
    const limit = searchParams.get("limit");
    const willPopulate = searchParams.get("willPopulate");
    const populatedProps = searchParams.get("populatedProps");

    await dbConnect();

    let subCategories;
    if (willPopulate === "false") {
      subCategories = await SubCategory.find()
        .select(specifiedProps || "")
        .limit(Number(limit) || 0);
    } else if (willPopulate === "true") {
      subCategories = await SubCategory.find()
        .select(specifiedProps || "")
        .limit(Number(limit) || 0)
        .populate({
          path: "mainCategory",
          model: MainCategory,
          select: populatedProps,
        });
    }

    return NextResponse.json({ ok: true, subCategories });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
