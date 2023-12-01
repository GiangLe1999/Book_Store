import { IBook } from "@/models/Book";
import { CoreEntity } from "../dtos/common.dto";
import { SubCategoryEntity } from "./sub-category.entity";
import { MainCategoryEntity } from "./main-category.entity";
import { UserEntity } from "./user.entity";

export interface BookEntity
  extends CoreEntity,
    Omit<IBook, "subCategory" | "mainCategory" | "author"> {
  subCategory: SubCategoryEntity[];
  mainCategory: MainCategoryEntity[];
  author: UserEntity;
}
