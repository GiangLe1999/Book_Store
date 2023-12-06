import { SubCategoryEntity } from "@/entities/sub-category.entity";

export interface CreateSubCategoryInput
  extends Pick<SubCategoryEntity, "name" | "description" | "slug"> {
  mainCategory?: string;
}
