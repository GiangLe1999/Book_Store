import { IDatabaseImage } from "@/lib/cloudinary";
import { ObjectId } from "mongodb";
import mongoose, { Schema, models } from "mongoose";

export interface IArticle {
  name: string;
  description: string;
  slug: string;
  thumbnail?: IDatabaseImage;
  content: string;
  author: ObjectId;
  views: number;
  tags?: string[];
}

const articleSchema: Schema<IArticle> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    slug: {
      type: String,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },

    content: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

articleSchema.index({ name: "text" });

const Article = models.Article || mongoose.model("Article", articleSchema);

export default Article;
