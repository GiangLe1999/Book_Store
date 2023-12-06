import { CreateBookInput } from "./create-book.dto";

export interface EditBookInput extends CreateBookInput {
  bookId: string;
}
