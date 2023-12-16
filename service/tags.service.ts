import axiosInstance from "@/lib/axios";

export const getAllTags = async () => {
  try {
    const { data }: { data: { tags: string[]; ok: boolean } } =
      await axiosInstance(`/api/public/tags`);

    return data.tags;
  } catch (err: any) {
    console.log(err);
    return;
  }
};
