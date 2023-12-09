import Link from "next/link";
import { FC } from "react";
import ContainNextImage from "./contain-next-image";

interface Props {
  wrapperClasses: string;
  textWhite?: boolean;
}

const Logo: FC<Props> = ({ wrapperClasses, textWhite }): JSX.Element => {
  return (
    <Link href="/" className={`relative block ${wrapperClasses}`}>
      <ContainNextImage
        src={
          textWhite
            ? "/assets/images/kho-sach-247-logo-white-text.svg"
            : "/assets/images/kho-sach-247-logo.svg"
        }
        alt="Kho sách 247 Logo"
      />
    </Link>
  );
};

export default Logo;
