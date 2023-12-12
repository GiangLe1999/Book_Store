import { BookEntity } from "@/entities/book.entity";
import Link from "next/link";
import { FC } from "react";
import NextImage from "./next-image";
import { path } from "@/constants";
import { GiOpenBook } from "react-icons/gi";

interface Props {
  book: BookEntity;
}

const BookCard: FC<Props> = ({ book }): JSX.Element => {
  return (
    <Link
      href={`${path.book}${book.slug}`}
      className="relative block w-full m-4 ml-0 border aspect-[0.66] duration-500 rounded-[5px] transition hover:-translate-y-2 shadow-[1px_1px_5px_#333]"
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
  );
};

export default BookCard;
