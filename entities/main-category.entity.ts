import { CoreEntity } from "../dtos/common.dto";
import { IMainCategory } from "@/models/MainCategory";
import { BookEntity } from "./book.entity";
import { SubCategoryEntity } from "./sub-category.entity";

export interface MainCategoryEntity
  extends CoreEntity,
    Omit<IMainCategory, "subCategories" | "books" | "mainCategory"> {
  mainCategory: MainCategoryEntity[];
  subCategories: SubCategoryEntity[];
  books: BookEntity[];
}
