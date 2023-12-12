import { BookEntity } from "@/entities/book.entity";
import Link from "next/link";
import { FC } from "react";
import NextImage from "./next-image";
import { path } from "@/constants";
import { GiOpenBook } from "react-icons/gi";
import moment from "moment";
import "moment/locale/vi";

interface Props {
  book: BookEntity;
}

const BookCard: FC<Props> = ({ book }): JSX.Element => {
  return (
    <div className="group">
      <Link
        href={`${path.book}${book.slug}`}
        className="relative block w-full m-4 ml-0 border aspect-[0.66] duration-500 rounded-[5px] transition group-hover:-translate-y-2 shadow-[1px_1px_5px_#333]"
      >
        <NextImage
          src={book.cover.url}
          alt={book.name}
          className="rounded-[5px]"
        />
        <span className="border border-[#ffffff40] bg-primary rounded-[3px] z-3 absolute -top-2 left-2 w-8 h-8 grid place-items-center text-white">
          <GiOpenBook size={20} />
        </span>
      </Link>
      <Link href={`${path.book}${book.slug}`}>
        <h4 className="line-clamp-2 group-hover:text-primary transition">
          {book.name}
        </h4>

        <p className="text-sm capitalize text-[#a7a9ac] mt-2">
          {moment(book.createdAt).format("dddd - DD/MM/YYYY")}
        </p>
      </Link>
    </div>
  );
};

export default BookCard;
