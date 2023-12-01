import { IUser } from "@/models/User";
import { CoreEntity } from "../dtos/common.dto";
import { BookEntity } from "./book.entity";

export interface UserEntity
  extends CoreEntity,
    Omit<IUser, "password" | "books"> {
  books: BookEntity[];
}
