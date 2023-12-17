import { path } from "@/constants";
import { BookEntity } from "@/entities/book.entity";
import Link from "next/link";
import { FC } from "react";
import { StarRating } from "../star-rating";
import moment from "moment";
import "moment/locale/vi";
import slugify from "slugify";
import BookSocialShare from "./book-social-share-btns";

interface Props {
  book: BookEntity | undefined;
}

const BookGeneralInfo: FC<Props> = ({ book }): JSX.Element => {
  return (
    <>
      <h1 className="font-bold text-3xl text-white">{book?.name}</h1>
      <div className="flex items-center gap-x-8 gap-y-4 mt-4 text-white max-[1250px]:justify-center flex-wrap">
        <h2>
          Tác giả :{" "}
          <Link
            href={`${path.author}${slugify(book?.realAuthor || "", {
              lower: true,
            })}`}
            className="font-semibold hover:underline"
          >
            {book?.realAuthor}
          </Link>
        </h2>
        <div className="flex items-center gap-2">
          Đánh giá : <StarRating defaultRating={book?.ratings} readonly />
          <span className="font-bold">
            ({book?.ratings} / {book?.numOfRatings} đánh giá)
          </span>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-x-[38px] gap-y-4 mt-4 text-white max-[1250px]:justify-center">
        <p>
          Ngày đăng :{" "}
          <span className="font-semibold">
            {moment(book?.createdAt).format("DD/MM/YYYY")}
          </span>
        </p>{" "}
        <p>
          Lượt xem : <span className="font-semibold">{book?.views}</span>
        </p>
      </div>

      <div className="mt-6 text-white">
        <BookSocialShare
          slug={book?.slug || ""}
          title={book?.name || ""}
          quote={book?.name || ""}
        />
      </div>
    </>
  );
};

export default BookGeneralInfo;
