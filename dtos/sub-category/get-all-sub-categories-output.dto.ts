import { CoreOutput } from "../common.dto";
import { SubCategoryEntity } from "@/entities/sub-category.entity";
export interface GetAllSubCategoriesOutput extends CoreOutput {
  subCategories?: SubCategoryEntity[];
}
