import { EditProfileInput } from "@/dtos/user/edit-profile.dto";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    await dbConnect();

    const existedUser = await User.findById(userId).select("-password");

    if (!existedUser) {
      return NextResponse.json(
        { ok: false, error: "Không tìm thấy user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, user: existedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const newData: EditProfileInput = await req.json();
    const {
      id,
      email,
      name,
      avatar,
      description,
      facebook,
      linkedin,
      twitter,
      youtube,
    } = newData;

    if (!id || !email || !name) {
      return NextResponse.json(
        { ok: false, error: "Thiếu tham số cần thiết" },
        { status: 400 }
      );
    }

    await dbConnect();

    let user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Không tìm thấy user" },
        { status: 404 }
      );
    }

    const newImage = await editCloudinaryImage(avatar || "", user.avatar);
    if (newImage) {
      user.avatar = { public_id: newImage.public_id, url: newImage.secure_url };
    }

    user.email = email;
    user.name = name;
    user.description = description;
    user.facebook = facebook;
    user.linkedin = linkedin;
    user.twitter = twitter;
    user.youtube = youtube;

    await user.save();

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
