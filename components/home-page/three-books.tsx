import { path } from "@/constants";
import Link from "next/link";
import { FC } from "react";
import NextImage from "../next-image";

interface Props {}

export const homeThreeBooks = [
  { cover: "ngu-van-10-tap-mot-bia-sach.jpg", slug: "ngu-van-lop-10-tap-mot" },
  { cover: "hoa-hoc-lop-8-bia-sach.jpg", slug: "hoa-hoc-lop-8" },
  { cover: "toan-lop-5-bia-sach.jpg", slug: "toan-lop-5" },
];

const ThreeBooks: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <Link
        href={`${path.book}ngu-van-lop-10-tap-mot`}
        className="relative block w-[200px] aspect-[0.75]"
      >
        <NextImage
          src="/assets/images/home/ngu-van-10-tap-mot-bia-sach.jpg"
          alt="Sách Ngữ văn lớp 10 tập một"
        />
      </Link>
    </div>
  );
};

export default ThreeBooks;
