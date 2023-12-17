"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import CategoryPageSidebar from "@/components/category-page/category-page-sidebar";
import { path } from "@/constants";
import { NextPage } from "next";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { BookEntity } from "@/entities/book.entity";
import { getSameTagBooks } from "@/service/books.service";
import BooksList from "@/components/books-list";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Head from "next/head";

interface Props {
  params: { slug: string };
}

const TagPage: NextPage<Props> = ({ params }) => {
  const [books, setBooks] = useState<BookEntity[] | undefined>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [tagName, setTagName] = useState("");

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const data = await getSameTagBooks(params.slug, currentPage, 8);
      setBooks(data?.books || []);
      setTotalPages(data?.totalPages || 1);
      setTagName(data?.tagName || "");
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
        <title>Thẻ {tagName}</title>
      </Head>
      <Breadcrumbs>
        <li>
          <Link href={path.allTags} className="hover:underline">
            Tag
          </Link>
        </li>
        <FaAngleRight size={14} className="mt-[2px]" />
        <li>
          <Link
            href={`${path.tag}${params.slug}`}
            className="hover:underline text-primary font-semibold"
          >
            {tagName}
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
                    Sách thuộc thẻ{" "}
                    <span className="capitalize">“{tagName}”</span>
                  </h3>

                  <p className="mb-3 leading-8">
                    Tham khảo hàng ngàn tựa sách hay nhất được chọn lọc từ theo
                    thẻ <strong>{tagName}</strong>. Bạn có thể đọc online các
                    tựa sách thuộc thẻ {tagName} hoặc download dưới dạng PDF một
                    cách miễn phí để tiện cho quá trình sử dụng.
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

export default TagPage;
