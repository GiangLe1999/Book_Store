import { CoreEntity } from "../dtos/common.dto";
import { ISubCategory } from "@/models/SubCategory";
import { BookEntity } from "./book.entity";
import { MainCategoryEntity } from "./main-category.entity";

export interface SubCategoryEntity
  extends CoreEntity,
    Omit<ISubCategory, "books" | "mainCategory"> {
  mainCategory: MainCategoryEntity;
  books: BookEntity[];
}
