import { MyProfileOutput } from "@/dtos/user/my-profile.dto";
import axiosInstance from "@/lib/axios";

export const getUserProfileById = async (userId: string) => {
  try {
    const { data }: { data: MyProfileOutput } = await axiosInstance(
      `/api/admin/user?userId=${userId}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
