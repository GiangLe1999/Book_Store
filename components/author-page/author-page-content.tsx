"use client";

import { FC, useEffect, useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import CategoryPageSidebar from "@/components/category-page/category-page-sidebar";
import { path } from "@/constants";
import { NextPage } from "next";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { BookEntity } from "@/entities/book.entity";
import {
  getSameAuthorBooks,
  getSamePublisherBooks,
} from "@/service/books.service";
import BooksList from "@/components/books-list";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Head from "next/head";

interface Props {
  params: {
    slug: string;
  };
}

const AuthorPageContent: FC<Props> = ({ params }): JSX.Element => {
  const [books, setBooks] = useState<BookEntity[] | undefined>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const data = await getSameAuthorBooks(params.slug, currentPage, 8);
      setBooks(data?.books || []);
      setTotalPages(data?.totalPages || 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [params.slug, currentPage]);
  return (
    <>
      <Head>
        <title>Tác giả {books?.[0]?.realAuthor}</title>
      </Head>
      <Breadcrumbs>
        <li>
          <Link href={path.allAuthors} className="hover:underline">
            Tác giả
          </Link>
        </li>
        <FaAngleRight size={14} className="mt-[2px]" />
        <li>
          <Link
            href={`${path.author}${params.slug}`}
            className="hover:underline text-primary font-semibold"
          >
            {books?.[0]?.realAuthor}
          </Link>
        </li>
      </Breadcrumbs>

      <div className="container">
        <div className="flex gap-12 max-[1100px]:block">
          <div className="w-[70%] max-[1100px]:w-full max-[1100px]:pb-8 max-[1100px]:border-b">
            <div>
              {isLoading ? (
                <>
                  <Skeleton width="200px" height="30px" className="mt-6 mb-4" />
                  <Skeleton width="100%" height="100px" className="mb-4" />
                </>
              ) : (
                <>
                  <h3 className="h3-heading">
                    Sách cùng tác giả{" "}
                    <span className="capitalize">{books?.[0]?.realAuthor}</span>{" "}
                  </h3>

                  <p className="mb-3 leading-8">
                    Tham khảo hàng ngàn tựa sách hay nhất được chọn lọc từ{" "}
                    <strong>{books?.[0]?.realAuthor}</strong>. Sách do của{" "}
                    {books?.[0]?.realAuthor} phát hành luôn phong phú về thể
                    loại, đảm bảo chất lượng về nội dung và hình thức. Bạn có
                    thể đọc online các tựa sách của tác giả{" "}
                    {books?.[0]?.publisher} hoặc download miễn phí để tiện cho
                    quá trình sử dụng.
                  </p>
                </>
              )}

              <BooksList
                books={books}
                currentPage={currentPage}
                isLoading={isLoading}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </div>

          <div className="flex-1 max-[1100px]:mt-8 max-[1100px]:w-1/2 max-[1100px]:mx-auto max-[700px]:w-full">
            <h3 className="h3-heading">Gợi ý cho bạn</h3>
            <CategoryPageSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorPageContent;
