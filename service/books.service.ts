import { GetAllBooksOutput } from "@/dtos/book/get-all-books.dto";
import { GetBookBySlugOutput } from "@/dtos/book/get-book-by-slug.dto";
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
