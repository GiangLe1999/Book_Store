import Link from "next/link";
import { FC } from "react";
import ContainNextImage from "./contain-next-image";

interface Props {
  wrapperClasses: string;
}

const Logo: FC<Props> = ({ wrapperClasses }): JSX.Element => {
  return (
    <Link href="/" className={`relative block ${wrapperClasses}`}>
      <ContainNextImage
        src="/assets/images/kho-sach-247-logo-white-text.svg"
        alt="Kho sách 247 Logo"
      />
    </Link>
  );
};

export default Logo;
