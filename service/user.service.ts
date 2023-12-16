import { MyProfileOutput } from "@/dtos/user/my-profile.dto";
import { UserEntity } from "@/entities/user.entity";
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

export const getUserProfileBySlug = async (slug: string) => {
  try {
    const { data }: { data: { user: UserEntity; ok: boolean } } =
      await axiosInstance(`/api/public/user?slug=${slug}`);

    return data.user;
  } catch (error) {
    console.log(error);
  }
};
