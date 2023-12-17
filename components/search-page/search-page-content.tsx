"use client";

import { FC } from "react";
import BooksList from "@/components/books-list";
import Breadcrumbs from "@/components/breadcrumbs";
import BtnWithIcon from "@/components/btn-with-icon";
import CategoryPageSidebar from "@/components/category-page/category-page-sidebar";
import { path } from "@/constants";
import { BookEntity } from "@/entities/book.entity";
import { getSearchResults } from "@/service/books.service";
import Head from "next/head";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
export const dynamic = "force-dynamic";

interface Props {}

const SearchPageContent: FC<Props> = (props): JSX.Element => {
  const searchParams = useSearchParams();
  const query = searchParams.get("tu-khoa");
  const [newQuery, setNewQuery] = useState("");
  const router = useRouter();
  const [totalResults, setTotalResults] = useState(0);

  const [books, setBooks] = useState<BookEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!newQuery || !newQuery.trim()) {
      return;
    }

    router.push(`${path.search}?tu-khoa=${newQuery}`);
  };

  useEffect(() => {
    if (query) {
      setNewQuery(query);
    }
  }, [query]);

  const fetchResults = async () => {
    if (!query || !query.trim()) {
      return;
    }

    setIsLoading(true);
    const data = await getSearchResults(query, currentPage, 8);
    setBooks(data?.books || []);
    setTotalPages(data?.totalPages || 1);
    setTotalResults(data?.numberOfResults || 0);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [query, currentPage]);
  return (
    <>
      <Head>
        <title>Kết quả tìm kiếm cho {query}</title>
      </Head>
      <Breadcrumbs>
        <li>
          <Link href="" className="hover:underline text-primary font-semibold">
            Tìm kiếm
          </Link>
        </li>
      </Breadcrumbs>
      <div className="container">
        <div className="flex gap-12 max-[1100px]:block">
          <div className="w-[70%] max-[1100px]:w-full max-[1100px]:pb-8 max-[1100px]:border-b">
            <h3 className="h3-heading">Kết quả tìm kiếm cho “{query}”</h3>
            <p className="leading-8">
              Đã tìm thấy <strong>{totalResults}</strong> kết quả phù hợp.
            </p>

            <div className="mt-6 mx-auto w-full">
              <form
                onSubmit={searchHandler}
                className="flex items-center w-full py-[2px] pl-8 pr-[2px] bg-white rounded-[22px] border"
              >
                <input
                  type="text"
                  className="flex-1 py-2 h-full outline-none text-2xl max-[500px]:text-base"
                  onChange={(e) => setNewQuery(e.target.value)}
                  value={newQuery || ""}
                />

                <BtnWithIcon
                  content="Tìm kiếm"
                  type="submit"
                  customClasses="!text-xl max-[500px]:!text-base !w-[120px] !h-[60px] max-[500px]:!h-[50px] before:!rounded-r-[22px] !rounded-r-[22px]"
                  isFrontpage
                />
              </form>

              <div className="mt-6">
                <BooksList
                  books={books}
                  currentPage={currentPage}
                  isLoading={isLoading}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
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

export default SearchPageContent;
