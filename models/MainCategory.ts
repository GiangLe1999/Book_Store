import { Model, Schema, models, model, ObjectId } from "mongoose";

export interface IMainCategory {
  name: string;
  description: string;
  slug: string;
  subCategories?: [ObjectId];
  books?: [ObjectId];
}

const mainCategorySchema: Schema<IMainCategory> = new Schema(
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

    subCategories: {
      type: [Schema.Types.ObjectId],
      ref: "SubCategory",
    },

    books: {
      type: [Schema.Types.ObjectId],
      ref: "Book",
    },
  },
  { timestamps: true }
);

const MainCategory: Model<IMainCategory> =
  models.MainCategory || model("MainCategory", mainCategorySchema);

export default MainCategory;
