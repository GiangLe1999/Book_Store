import { socialItems } from "@/data/menu";
import { FC } from "react";

interface Props {
  isMobile?: boolean;
}

const Socials: FC<Props> = ({ isMobile }): JSX.Element => {
  return (
    <ul
      className={`flex items-center gap-3 ${
        isMobile ? "text-primary" : "text-white"
      } `}
    >
      {socialItems.map((socialItem, index) => (
        <a key={index} href={socialItem.link} target="_blank" rel="noopener">
          {socialItem.icon({ size: 12 })}
        </a>
      ))}
    </ul>
  );
};

export default Socials;
