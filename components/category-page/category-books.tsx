"use client";
import { BookEntity } from "@/entities/book.entity";
import { FC, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import {
  getSameMainCategoryBooks,
  getSameSubCategoryBooks,
} from "@/service/books.service";
import BookCard from "../book-card";

interface Props {
  categoryId: string | undefined;
  isMainCategory?: boolean;
}

const CategoryBooks: FC<Props> = ({
  categoryId,
  isMainCategory,
}): JSX.Element => {
  const [books, setBooks] = useState<BookEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    if (!categoryId) {
      return;
    }

    setIsLoading(true);
    const data = isMainCategory
      ? await getSameMainCategoryBooks(categoryId, currentPage, 8)
      : await getSameSubCategoryBooks(categoryId, currentPage, 8);
    setBooks(data?.books || []);
    setTotalPages(data?.totalPages || 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [categoryId, currentPage]);

  return (
    <div>
      <>
        {isLoading ? (
          <div className="grid grid-cols-4 gap-8">
            {[...Array(9).keys()].map((item) => (
              <Skeleton className="w-full aspect-[0.66]" key={item} />
            ))}
          </div>
        ) : (
          <>
            {books && books?.length > 0 ? (
              <div>
                <div className="grid grid-cols-4 gap-8">
                  {books?.map((book) => (
                    <BookCard key={book._id.toString()} book={book} />
                  ))}
                </div>
                <div className="w-fit pagination pt-12 max-[500px]:pt-8 mx-auto">
                  <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                    previousLabel="Trang trước"
                    nextLabel="Trang sau"
                  />
                </div>
              </div>
            ) : (
              <p>Không tìm thấy sách phù hợp</p>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default CategoryBooks;
