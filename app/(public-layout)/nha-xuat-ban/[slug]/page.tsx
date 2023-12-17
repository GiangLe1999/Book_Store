"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import CategoryPageSidebar from "@/components/category-page/category-page-sidebar";
import { path } from "@/constants";
import { NextPage } from "next";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { BookEntity } from "@/entities/book.entity";
import { getSamePublisherBooks } from "@/service/books.service";
import BooksList from "@/components/books-list";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  params: { slug: string };
}

const PulisherPage: NextPage<Props> = ({ params }) => {
  const [books, setBooks] = useState<BookEntity[] | undefined>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const data = await getSamePublisherBooks(params.slug, currentPage, 8);
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
      <Breadcrumbs>
        <li>
          <Link href={path.allPublishers} className="hover:underline">
            Nhà xuất bản
          </Link>
        </li>
        <FaAngleRight size={14} className="mt-[2px]" />
        <li>
          <Link
            href={`${path.publisher}${params.slug}`}
            className="hover:underline text-primary font-semibold"
          >
            {books?.[0]?.publisher}
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
                    Sách do{" "}
                    <span className="capitalize">{books?.[0]?.publisher}</span>{" "}
                    phát hành
                  </h3>

                  <p className="mb-3 leading-8">
                    Tham khảo hàng ngàn tựa sách hay nhất được chọn lọc từ{" "}
                    <strong>{books?.[0]?.publisher}</strong>. Sách do{" "}
                    {books?.[0]?.publisher} phát hành luôn phong phú về thể
                    loại, đảm bảo chất lượng về nội dung và hình thức.{" "}
                    {books?.[0]?.publisher} cũng đã đóng góp không nhỏ vào sự
                    phát triển văn hoá đọc tại Việt Nam với hàng loạt các tác
                    phẩm xuất sắc từ nhiều ngôn ngữ. Bạn có thể đọc online các
                    tựa sách từ {books?.[0]?.publisher} hoặc download miễn phí
                    để tiện cho quá trình sử dụng.
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

export default PulisherPage;
