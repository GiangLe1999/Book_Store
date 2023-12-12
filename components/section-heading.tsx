import Link from "next/link";
import { FC } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

interface Props {
  heading: string;
  link: string;
}

const SectionHeading: FC<Props> = ({ heading, link }): JSX.Element => {
  return (
    <div className="flex justify-between items-baseline">
      <h3 className="font-semibold text-3xl text-primary font-garamond capitalize">
        {heading}
      </h3>
      <Link
        href={link}
        className="flex items-center gap-2 font-semibold text-light_text hover:translate-x-2 transition"
      >
        Xem tất cả <FaArrowRightLong size={14} className="mt-[2px]" />
      </Link>
    </div>
  );
};

export default SectionHeading;
