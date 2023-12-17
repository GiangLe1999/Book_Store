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
  isSidebar?: boolean;
}

const AccordionItem: FC<ItemsProps> = ({ header, isSidebar, ...rest }) => {
  return (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <div
          className={`flex items-center justify-between ${
            isSidebar ? "w-full" : "w-[80%]"
          }`}
        >
          <span
            className={`block ${
              isSidebar ? "text-gray-700 py-1" : "text-[#dbdbdb] text-sm"
            } transition`}
          >
            {header}
          </span>
          <FiChevronDown
            className={`ml-auto transition-transform duration-200 ease-out w-3 h-3  ${
              isSidebar ? "text-gray-700" : "text-[#dbdbdb]"
            } ${isEnter && "rotate-180"}`}
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
  data: { header: ReactNode; content: ReactNode }[];
  isSidebar?: boolean;
}

const FooterAccordion: FC<Props> = ({ data, isSidebar }): JSX.Element => {
  return (
    <div
      className={`my-4 transition ${
        isSidebar ? "text-gray-700" : "text-white"
      }`}
    >
      <Accordion transition transitionTimeout={500}>
        {data.map((group, index) => (
          <AccordionItem
            header={group.header as string}
            key={index}
            isSidebar={isSidebar}
          >
            {group.content}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FooterAccordion;
