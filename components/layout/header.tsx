import { path } from "@/constants";
import { mainHeaderItems, socialItems, topHeaderItems } from "@/data/menu";
import moment from "moment";
import "moment/locale/vi";
import Link from "next/link";
import { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../logo";
import Socials from "./socials";

interface Props {}

const Header: FC<Props> = (props): JSX.Element => {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Navbar 1 */}
      <nav className="main-gradient py-2">
        <div className="container text-white text-sm flex justify-between">
          <ul className="flex items-center gap-6 z-10">
            {topHeaderItems.map((parent, index) => (
              <li key={index} className="capitalize relative group">
                <Link
                  href={`${path.category}${parent.slug}`}
                  className="flex items-center gap-1"
                >
                  {parent.name}
                  {parent.children && (
                    <IoIosArrowDown size={9} className="mt-[2px]" />
                  )}
                </Link>

                {parent.children && (
                  <ul className="px-3 scale-x-100 scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 origin-top transition-all bg-white rounded shadow-md w-max min-w-full absolute border top-[130%] left-0 text-light_text">
                    {parent.children.map((child, childIndex) => (
                      <li
                        key={childIndex}
                        className={`py-3 ${
                          childIndex !== parent.children.length - 1 &&
                          "border-b"
                        } hover:underline hover:font-semibold`}
                      >
                        <Link
                          href={`${path.category}${parent.slug}/${child.slug}`}
                          className="block"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <Socials />

            <span className="capitalize">
              {moment(Date.now()).format("dddd - DD/MM/YYYY")}
            </span>
          </div>
        </div>
      </nav>

      {/* Navbar 2 */}
      <nav className="bg-white py-4 shadow">
        <div className="container flex gap-20">
          <Logo wrapperClasses="w-[200px] h-[30px]" />

          <ul className="flex items-center justify-between gap-8 flex-1">
            {mainHeaderItems.map((parent) => (
              <li
                key={parent.name}
                className="group relative text-sm uppercase hover:text-primary transition font-semibold text-light_text"
              >
                <Link
                  href={`${path.category}${parent.slug}`}
                  className="flex items-center gap-2"
                >
                  {parent.name}
                  {parent.children && (
                    <IoIosArrowDown size={12} className="mt-[2px]" />
                  )}
                </Link>

                {parent.children && (
                  <ul className="text-[13px] z-10 px-3 scale-x-100 scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 origin-top transition-all bg-white rounded shadow-md w-max min-w-full absolute border top-[130%] right-0 text-light_text">
                    {parent.children.map((child, childIndex) => (
                      <li
                        key={childIndex}
                        className={`py-2 ${
                          childIndex !== parent.children.length - 1 &&
                          "border-b"
                        } hover:underline hover:font-semibold capitalize font-normal`}
                      >
                        <Link
                          href={`${path.category}${parent.slug}/${child.slug}`}
                          className="block"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
