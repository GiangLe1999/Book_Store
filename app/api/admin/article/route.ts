import { CreateArticleInput } from "@/dtos/article/create-article.dto";
import { EditArticleInput } from "@/dtos/article/edit-article.dto";
import { editCloudinaryImage } from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import User from "@/models/User";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function POST(req: Request) {
  try {
    const body: CreateArticleInput = await req.json();

    const { name, slug, description, content, thumbnail, authorId, tags } =
      body;

    if (!name || !slug || !description || !content || !authorId) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu thông tin cần thiết của bài viết",
      });
    }

    let savedThumbnail = { public_id: "", url: "" };
    const processedImage = await editCloudinaryImage(thumbnail);
    if (processedImage) {
      savedThumbnail = {
        public_id: processedImage.public_id,
        url: processedImage.secure_url,
      };
    }

    await dbConnect();

    const article = await Article.create({
      name,
      slug,
      description,
      content,
      thumbnail: savedThumbnail,
      ...(tags && { tags: tags }),
      author: authorId,
    });

    const user = await User.findById(authorId).select("articles");

    if (user && user.articles) {
      user.articles.push(article._id);
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
    const body: EditArticleInput = await req.json();

    const { name, slug, description, content, thumbnail, articleId, tags } =
      body;

    if (!name || !slug || !description || !content || !articleId) {
      return NextResponse.json({
        ok: false,
        error: "Thiếu tham số cần thiết",
      });
    }

    await dbConnect();

    const article = await Article.findById(articleId);

    if (!article) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy bài viết" });
    }

    const newThumbnail = await editCloudinaryImage(
      thumbnail,
      article.thumbnail
    );
    if (newThumbnail) {
      article.thumbnail = {
        public_id: newThumbnail.public_id,
        url: newThumbnail.secure_url,
      };
    }

    article.name = name;
    article.slug = slug;
    article.description = description;
    article.content = content;

    if (tags) {
      article.tags = tags;
    }

    await article.save();

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
        error: "Thiếu tham số id của bài viết",
      });
    }

    await dbConnect();

    const article = await Article.findById(id);

    if (!article) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy bài viết" });
    }

    await cloudinary.v2.uploader.destroy(article.thumbnail.public_id);

    // User
    const user: any = await User.findById(article.author.toString()).select(
      "articles"
    );

    if (user) {
      const articleIndex = user.articles.findIndex((r: any) => {
        return r.toString() === id;
      });

      user.articles.splice(articleIndex, 1);
      user.save();
    }

    await Article.deleteOne({ _id: id });

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
