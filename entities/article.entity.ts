import { CoreEntity } from "@/dtos/common.dto";
import { IArticle } from "@/models/Article";
import { UserEntity } from "./user.entity";

export interface ArticleEntity extends CoreEntity, Omit<IArticle, "author"> {
  author: UserEntity;
}
