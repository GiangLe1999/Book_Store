import { IBook } from "@/models/Book";

export interface CreateBookInput
  extends Omit<
    IBook,
    | "views"
    | "ratings"
    | "numOfRatings"
    | "cover"
    | "mainCategory"
    | "subCategory"
    | "author"
    | "tags"
  > {
  cover?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  authorId: string;
  tags?: string[];
}
