import { GetAllMainCategoriesOutput } from "@/dtos/main-category/get-all-main-categories-output.dto";
import axiosInstance from "@/lib/axios";

export const getAllMainCategories = async (
  specifiedProps: string = "",
  limit: string = "",
  willPopulate: boolean = false,
  populatedProps: string = ""
) => {
  try {
    const { data }: { data: GetAllMainCategoriesOutput } = await axiosInstance(
      "/api/public/main-categories",
      { params: { specifiedProps, limit, willPopulate, populatedProps } }
    );

    return data.mainCategories;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getAllMainCategoriesWithBooks = async () => {
  try {
    const { data }: { data: GetAllMainCategoriesOutput } = await axiosInstance(
      "/api/public/main-categories/with-books"
    );

    return data.mainCategories;
  } catch (err: any) {
    console.log(err);
    return;
  }
};
