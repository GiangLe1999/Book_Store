"use client";

import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BookEntity } from "@/entities/book.entity";
import BookCard from "../book-card";
import { getRelatedBooks } from "@/service/books.service";

interface Props {
  categoryId: string | undefined;
  currentId: string | undefined;
}

const RelatedBooks: FC<Props> = ({ categoryId, currentId }): JSX.Element => {
  const [relatedBooks, setRelatedBooks] = useState<BookEntity[] | undefined>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchrelatedBooks = async () => {
    setIsLoading(true);
    try {
      const relatedBooks = await getRelatedBooks(
        categoryId || "",
        currentId || ""
      );
      setIsLoading(false);
      setRelatedBooks(relatedBooks);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchrelatedBooks();
  }, []);

  return (
    <div>
      <>
        {isLoading ? (
          <div className="grid grid-cols-4 gap-6">
            {[...Array(4).keys()].map((item) => (
              <Skeleton className="w-full aspect-[0.66]" key={item} />
            ))}
          </div>
        ) : (
          <>
            {relatedBooks && relatedBooks?.length > 0 ? (
              <div>
                <div className="grid grid-cols-4 gap-6">
                  {relatedBooks?.map((book) => (
                    <BookCard key={book._id.toString()} book={book} />
                  ))}
                </div>
              </div>
            ) : (
              <p>Không tìm thấy sách cùng danh mục</p>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default RelatedBooks;
