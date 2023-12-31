import { IDatabaseImage } from "@/dtos/common.dto";
import { Model, Schema, models, model, ObjectId } from "mongoose";

export interface IBook {
  name: string;
  description: string;
  slug: string;
  downloadLink: string;
  shopeeLink?: string;
  lazadaLink?: string;
  tikiLink?: string;
  fahasaLink?: string;
  cover: IDatabaseImage;
  subCategory?: ObjectId;
  mainCategory?: ObjectId;
  realAuthor?: string;
  publisher?: string;
  content: string;
  author: ObjectId;
  views: number;
  ratings: number;
  numOfRatings: number;
  tags: string[];
}

const bookSchema: Schema<IBook> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    downloadLink: {
      type: String,
      required: true,
    },

    shopeeLink: {
      type: String,
    },

    lazadaLink: {
      type: String,
    },

    tikiLink: {
      type: String,
    },

    fahasaLink: {
      type: String,
    },

    cover: {
      type: { public_id: String, url: String },
    },

    mainCategory: {
      type: Schema.Types.ObjectId,
      ref: "MainCategory",
    },

    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },

    content: {
      type: String,
      required: true,
    },

    realAuthor: {
      type: String,
    },

    publisher: {
      type: String,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    ratings: {
      type: Number,
      default: 0,
    },

    numOfRatings: {
      type: Number,
      default: 0,
    },

    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

bookSchema.index({ name: "text" });

const Book: Model<IBook> = models.Book || model("Book", bookSchema);

export default Book;
