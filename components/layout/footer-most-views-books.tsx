"use client";

import { path } from "@/constants";
import { BookEntity } from "@/entities/book.entity";
import { getMostViewsBooks } from "@/service/books.service";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface Props {}

const FooterMostViewsBooks: FC<Props> = (props): JSX.Element => {
  const [books, setBooks] = useState<BookEntity[] | undefined>([]);

  const fetchBooks = async () => {
    try {
      const books = await getMostViewsBooks(true);

      setBooks(books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <ul className="space-y-2 list-disc ml-4">
      {books?.map((book) => (
        <li key={book._id} className="footer-item">
          <Link href={`${path.book}${book.slug}`} className="line-clamp-1">
            {book.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterMostViewsBooks;
