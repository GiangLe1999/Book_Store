import { FC } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { BookEntity } from "@/entities/book.entity";
import BookCard from "./book-card";

interface Props {
  isLoading: boolean;
  books: BookEntity[] | undefined;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (current: number) => void;
}

const BooksList: FC<Props> = ({
  isLoading,
  books,
  currentPage,
  totalPages,
  setCurrentPage,
}): JSX.Element => {
  return (
    <div>
      <>
        {isLoading ? (
          <div className="grid grid-cols-4 gap-8 max-[700px]:grid-cols-2">
            {[...Array(8).keys()].map((item) => (
              <Skeleton className="w-full aspect-[0.66]" key={item} />
            ))}
          </div>
        ) : (
          <>
            {books && books?.length > 0 ? (
              <div>
                <div className="grid grid-cols-4 gap-8 max-[700px]:grid-cols-2">
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

export default BooksList;
