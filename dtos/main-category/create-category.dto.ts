import { MainCategoryEntity } from "@/entities/main-category.entity";

export interface CreateCategoryInput
  extends Pick<MainCategoryEntity, "name" | "description" | "slug"> {}
