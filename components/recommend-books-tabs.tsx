"use client";

import { path } from "@/constants";
import { BookEntity } from "@/entities/book.entity";
import {
  getHighestScoresBooks,
  getMostViewsBooks,
  getNewestBooks,
} from "@/service/books.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import NextImage from "./next-image";
import moment from "moment";
import "moment/locale/vi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const panelItemClasses =
  "grid place-items-center py-3 cursor-pointer text-white";

const activePanelItemClasses = "!font-bold underline";

const RecommendBooksTabs = () => {
  const [active, setActive] = useState(0);
  const [books, setBooks] = useState<BookEntity[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);

      const books =
        active === 0
          ? await getMostViewsBooks()
          : active === 1
          ? await getHighestScoresBooks()
          : await getNewestBooks();

      setBooks(books);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [active]);

  return (
    <div className="rounded-md bg-white shadow-md">
      <div className="bg-primary grid grid-cols-3 rounded-t-md">
        <div
          className={`${panelItemClasses} ${
            active === 0 && activePanelItemClasses
          }`}
          onClick={() => setActive(0)}
        >
          Xem nhiều
        </div>
        <div
          className={`${panelItemClasses} ${
            active === 1 && activePanelItemClasses
          }`}
          onClick={() => setActive(1)}
        >
          Đánh giá cao
        </div>
        <div
          className={`${panelItemClasses} ${
            active === 2 && activePanelItemClasses
          }`}
          onClick={() => setActive(2)}
        >
          Mới nhất
        </div>
      </div>

      <ul className="py-6 px-4 text-slate-500 space-y-4">
        {isLoading ? (
          <>
            {[...Array(5).keys()].map((item) => (
              <Skeleton className="w-full h-[100px] mb-3" key={item} />
            ))}
          </>
        ) : (
          <>
            {books?.map((book) => (
              <li
                key={book._id}
                className="group hover:-translate-y-1 transition duration-500"
              >
                <Link href={`${path.book}${book.slug}`} className="flex gap-3">
                  <div className="w-[80px] aspect-[0.66] relative rounded border">
                    <NextImage
                      src={book?.cover?.url}
                      alt={book?.name}
                      className="rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="line-clamp-2 text-sm font-bold group-hover:text-primary transition">
                      {book?.name}
                    </h4>
                    <div className="text-xs space-y-1 mt-2">
                      <p>Lượt xem: {book?.views}</p>
                      <p>Đánh giá: {book?.ratings}</p>
                      <p>{moment(book?.createdAt).format("DD/MM/YYYY")}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default RecommendBooksTabs;
