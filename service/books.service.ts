import { GetAllBooksOutput } from "@/dtos/book/get-all-books.dto";
import { GetBookBySlugOutput } from "@/dtos/book/get-book-by-slug.dto";
import { CoreOutput } from "@/dtos/common.dto";
import axiosInstance from "@/lib/axios";

export const getAllBooksForAdmin = async () => {
  try {
    const { data }: { data: GetAllBooksOutput } = await axiosInstance(
      "/api/admin/books"
    );

    return data.books;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getBookBySlug = async (slug: string) => {
  try {
    const { data }: { data: GetBookBySlugOutput } = await axiosInstance(
      `/api/public/book?slug=${slug}`
    );

    return data.book;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getRelatedBooks = async (
  categoryId: string,
  currentId: string
) => {
  try {
    const { data }: { data: GetAllBooksOutput } = await axiosInstance(
      `/api/public/book/related`,
      { params: { categoryId, currentId } }
    );

    return data.books;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const rateBook = async (id: string, rating: number) => {
  try {
    const { data } = await axiosInstance.put(`/api/public/book/rating`, {
      id,
      rating,
    });

    return data.ok;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameMainCategoryBooks = async (
  mainCategoryId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetAllBooksOutput } = await axiosInstance(
      `/api/public/books/same-main-category`,
      {
        params: { mainCategoryId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getSameSubCategoryBooks = async (
  subCategoryId: string,
  page: number = 1,
  limit: number = 6
) => {
  try {
    const { data }: { data: GetAllBooksOutput } = await axiosInstance(
      `/api/public/books/same-sub-category`,
      {
        params: { subCategoryId, page, limit },
      }
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getMostViewsBooks = async () => {
  try {
    const { data }: { data: GetAllBooksOutput } = await axiosInstance(
      `/api/public/books/most-views`
    );

    return data.books;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getHighestScoresBooks = async () => {
  try {
    const { data }: { data: GetAllBooksOutput } = await axiosInstance(
      `/api/public/books/highest-scores`
    );

    return data.books;
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getNewestBooks = async () => {
  try {
    const { data }: { data: GetAllBooksOutput } = await axiosInstance(
      `/api/public/books/newest`
    );

    return data.books;
  } catch (err: any) {
    console.log(err);
    return;
  }
};
