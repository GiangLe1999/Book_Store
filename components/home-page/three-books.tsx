import { path } from "@/constants";
import Link from "next/link";
import { FC } from "react";
import NextImage from "../next-image";
import { GiOpenBook } from "react-icons/gi";

interface Props {}

export const homeThreeBooks = [
  { cover: "ngu-van-10-tap-mot-bia-sach.jpg", slug: "ngu-van-lop-10-tap-mot" },
  { cover: "hoa-hoc-lop-8-bia-sach.jpg", slug: "hoa-hoc-lop-8" },
  { cover: "toan-lop-5-bia-sach.jpg", slug: "toan-lop-5" },
];

const commonClasses =
  "relative block w-[221px] aspect-[0.66] three-books-shadow duration-500 rounded-[5px] three-books-shadow transition";

const iconClasses =
  "border border-[#ffffff40] bg-primary rounded-[3px] z-3 absolute -top-2 left-2 w-8 h-8 grid place-items-center text-white";

const ThreeBooks: FC<Props> = (props): JSX.Element => {
  return (
    <div className="flex items-center justify-center">
      <Link
        href={`${path.book}ngu-van-lop-10-tap-mot`}
        className={`${commonClasses} z-0 -mr-8 scale-90 hover:scale-100 hover:z-[2]`}
      >
        <NextImage
          src="/assets/images/home/ngu-van-10-tap-mot-bia-sach.jpg"
          alt="Sách Ngữ văn lớp 10 tập một"
          className="rounded-[5px]"
        />
        <span className={iconClasses}>
          <GiOpenBook size={20} />
        </span>
      </Link>
      <Link
        href={`${path.book}ngu-van-lop-10-tap-mot`}
        className={`${commonClasses} z-[1] hover:z-[3]`}
      >
        <NextImage
          src="/assets/images/home/hoa-hoc-lop-8-bia-sach.jpg"
          alt="Sách Ngữ văn lớp 10 tập một"
          className="rounded-[5px]"
        />
        <span className={iconClasses}>
          <GiOpenBook size={20} />
        </span>
      </Link>
      <Link
        href={`${path.book}ngu-van-lop-10-tap-mot`}
        className={`${commonClasses} z-0 -ml-8 scale-90 hover:scale-100 hover:z-[2]`}
      >
        <NextImage
          src="/assets/images/home/toan-lop-5-bia-sach.jpg"
          alt="Sách Ngữ văn lớp 10 tập một"
          className="rounded-[5px]"
        />
        <span className={iconClasses}>
          <GiOpenBook size={20} />
        </span>
      </Link>
    </div>
  );
};

export default ThreeBooks;
