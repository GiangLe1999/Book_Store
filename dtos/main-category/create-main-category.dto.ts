import { MainCategoryEntity } from "@/entities/main-category.entity";

export interface CreateMainCategoryInput
  extends Pick<MainCategoryEntity, "name" | "description" | "slug"> {}
