import { GetAllBooksOutput } from "./get-all-books.dto";

export interface GetSameTagBooks extends GetAllBooksOutput {
  tagName: string;
}
