import { ArticleEntity } from "@/entities/article.entity";

export interface CreateArticleInput
  extends Pick<
    ArticleEntity,
    "name" | "slug" | "description" | "content" | "tags"
  > {
  thumbnail?: string;
  authorId: string;
}
