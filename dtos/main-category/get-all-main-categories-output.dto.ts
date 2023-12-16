import { MainCategoryEntity } from "@/entities/main-category.entity";
import { CoreOutput } from "../common.dto";
export interface GetAllMainCategoriesOutput extends CoreOutput {
  mainCategories?: MainCategoryEntity[];
  numOfSubCategories?: number;
}
