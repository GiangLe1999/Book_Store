import { Model, Schema, models, model, ObjectId } from "mongoose";

export interface ISubCategory {
  name: string;
  description: string;
  slug: string;
  books?: [ObjectId];
}

const subCategorySchema: Schema<ISubCategory> = new Schema(
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

    books: {
      type: [Schema.Types.ObjectId],
      ref: "Book",
    },
  },
  { timestamps: true }
);

const SubCategory: Model<ISubCategory> =
  models.SubCategory || model("SubCategory", subCategorySchema);

export default SubCategory;
