import Link from "next/link";
import { FC, ReactNode } from "react";
import { FaAngleRight } from "react-icons/fa6";

interface Props {
  children: ReactNode;
}

const Breadcrumbs: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className="container">
      <ul className="flex items-center gap-4 text-gray-600">
        <li className="hover:underline">
          <Link href="/">Trang chủ</Link>
        </li>
        <FaAngleRight size={14} className="mt-[2px]" />
        {children}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
