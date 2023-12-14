import { GetAllSubCategoriesOutput } from "@/dtos/sub-category/get-all-sub-categories-output.dto";
import axiosInstance from "@/lib/axios";

export const getAllSubCategories = async (
  specifiedProps: string = "",
  limit: string = "",
  willPopulate: boolean = false,
  populatedProps: string = ""
) => {
  try {
    const { data }: { data: GetAllSubCategoriesOutput } = await axiosInstance(
      "/api/public/sub-categories",
      { params: { specifiedProps, limit, willPopulate, populatedProps } }
    );

    return data.subCategories;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameTypeSubCategories = async (mainCategoryId: string) => {
  try {
    const { data }: { data: GetAllSubCategoriesOutput } = await axiosInstance(
      "/api/public/sub-categories/same-main-category",
      { params: { mainCategoryId } }
    );

    return data.subCategories;
  } catch (err: any) {
    console.log(err);
    return;
  }
};
