"use client";

import { FC, ReactNode } from "react";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import { FiChevronDown } from "react-icons/fi";

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */

interface ItemsProps {
  header: string;
  children: JSX.Element | JSX.Element[] | ReactNode;
}

const AccordionItem: FC<ItemsProps> = ({ header, ...rest }) => {
  return (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <div className="flex items-center justify-between w-[80%]">
          <span className="block text-[#dbdbdb] text-sm transition">
            {header}
          </span>
          <FiChevronDown
            className={`ml-auto transition-transform duration-200 ease-out w-3 h-3 text-[#dbdbdb] ${
              isEnter && "rotate-180"
            }`}
          />
        </div>
      )}
      buttonProps={{
        className: ({ isEnter }) =>
          `flex w-full pb-[10.5px] ${isEnter && "font-bold"}`,
      }}
      contentProps={{
        className: "transition-height duration-[500ms]",
      }}
      panelProps={{ className: "pb-4 text-xs" }}
    />
  );
};

interface Props {
  data: { header: string; content: ReactNode }[];
}

const FooterAccordion: FC<Props> = ({ data }): JSX.Element => {
  return (
    <div className="my-4 transition text-white">
      <Accordion transition transitionTimeout={500}>
        {data.map((group, index) => (
          <AccordionItem header={group.header} key={index}>
            {group.content}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FooterAccordion;
