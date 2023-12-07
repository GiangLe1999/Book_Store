import { CoreOutput } from "../common.dto";
import { ArticleEntity } from "@/entities/article.entity";

export interface GetArticleBySlugOutput extends CoreOutput {
  article: ArticleEntity;
}
