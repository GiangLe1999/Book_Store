"use client";
import { BookEntity } from "@/entities/book.entity";
import { FC, useEffect, useState } from "react";
import {
  getSameMainCategoryBooks,
  getSameSubCategoryBooks,
} from "@/service/books.service";
import BooksList from "../books-list";

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
    <BooksList
      books={books}
      currentPage={currentPage}
      isLoading={isLoading}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
  );
};

export default CategoryBooks;
