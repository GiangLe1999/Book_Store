import { Model, Schema, models, model, ObjectId } from "mongoose";

export interface IBook {
  name: string;
  description: string;
  slug: string;
  subCategory?: ObjectId;
  mainCategory?: ObjectId;
  content: string;
  author: ObjectId;
  views: number;
  ratings: number;
  tags: [];
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

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: {
      type: Number,
    },

    ratings: {
      type: Number,
    },

    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Book: Model<IBook> = models.Book || model("Book", bookSchema);

export default Book;
