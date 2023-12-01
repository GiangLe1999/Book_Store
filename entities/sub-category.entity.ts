import { CoreEntity } from "../dtos/common.dto";
import { ISubCategory } from "@/models/SubCategory";
import { BookEntity } from "./book.entity";

export interface SubCategoryEntity
  extends CoreEntity,
    Omit<ISubCategory, "books"> {
  books: BookEntity[];
}
