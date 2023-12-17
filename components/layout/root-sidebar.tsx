import { FC } from "react";
import SearchBar from "./search-bar";
import FooterAccordion from "./footer-accordion";
import { footerAccordionData } from "@/data/footer-menu";
import Socials from "./socials";

interface Props {}

const RootSidebar: FC<Props> = (props): JSX.Element => {
  return (
    <div className="w-[320px]">
      <div className="p-6 border-b">
        <SearchBar isMobile />
      </div>
      <ul className="pl-7 pr-8 pb-12 relative">
        <FooterAccordion data={footerAccordionData} isSidebar />
        <div className="absolute left-7 bottom-6">
          <Socials isMobile />
        </div>
      </ul>
    </div>
  );
};

export default RootSidebar;
