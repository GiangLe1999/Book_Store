"use client";
import { BookEntity } from "@/entities/book.entity";
import { FC, useEffect, useState } from "react";
import { getSameUserBooks } from "@/service/books.service";
import BooksList from "../books-list";

interface Props {
  userId: string | undefined;
}

const AdminBooks: FC<Props> = ({ userId }): JSX.Element => {
  const [books, setBooks] = useState<BookEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async () => {
    if (!userId) {
      return;
    }

    setIsLoading(true);
    const data = await getSameUserBooks(userId, currentPage, 8);
    setBooks(data?.books || []);
    setTotalPages(data?.totalPages || 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [userId, currentPage]);

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

export default AdminBooks;
