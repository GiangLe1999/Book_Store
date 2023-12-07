import { GetAllArticlesOutput } from "@/dtos/article/get-all-articles.dto";
import { GetArticleBySlugOutput } from "@/dtos/article/get-article-by-slug.dto";
import axiosInstance from "@/lib/axios";

export const getAllArticlesForAdmin = async () => {
  try {
    const { data }: { data: GetAllArticlesOutput } = await axiosInstance(
      "/api/admin/articles"
    );

    return data.articles;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getArticleBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetArticleBySlugOutput } = await axiosInstance(
      `/api/public/article?slug=${slug}`
    );

    return data.article;
  } catch (err: any) {
    console.log(err);
    return;
  }
};
