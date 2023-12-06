import { BookEntity } from "@/entities/book.entity";
import { CoreOutput } from "../common.dto";

export interface GetAllBooksOutput extends CoreOutput {
  books?: BookEntity[];
}
