import { BookEntity } from "@/entities/book.entity";
import { CoreOutput } from "../common.dto";

export interface GetBookBySlugOutput extends CoreOutput {
  book: BookEntity;
}
