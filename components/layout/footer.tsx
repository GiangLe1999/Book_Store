import { FC } from "react";
import Link from "next/link";
import NextImage from "../next-image";
import FooterAccordion from "./footer-accordion";
import {
  footerAccordionData,
  footerCol1,
  footerCol31,
  footerCol32,
  footerCol4,
} from "@/data/footer-menu";
import Socials from "./socials";

interface Props {}

const Footer: FC<Props> = (): JSX.Element => {
  return (
    <footer className="mt-14 main-gradient border-t">
      <div className="container flex flex-wrap gap-1 py-10 max-[1017px]:gap-3">
        {/* Column1 */}
        <div className="w-1/3 pr-3 max-[1017px]:w-[50%] max-[717px]:w-full">
          {/* General info */}
          <p className="footer-title">KHO SÁCH 247 - THƯ VIỆN PDF MIỄN PHÍ</p>
          <ul>
            {footerCol1.map((item, index) => (
              <li className="footer-item" key={index}>
                <span className="font-semibold">{item?.title}</span>
                {item?.content}
              </li>
            ))}
          </ul>

          {/* Social */}
          <p className="footer-title mt-12 max-[717px]:mt-6">
            Liên hệ với kho sách 247
          </p>
          <ul className="mb-4">
            {footerCol4.map((item, index) => (
              <li key={index} className="footer-item">
                <a href={item.link}>
                  <span className="font-semibold">{item.title}</span>
                  {item.content}
                </a>
              </li>
            ))}
          </ul>
          <Socials />
        </div>

        {/* Column2 */}
        <div className="w-[18%] px-3 max-[717px]:w-[45%] max-[717px]:px-0">
          <p className="footer-title">Danh mục</p>
          <ul>
            <FooterAccordion data={footerAccordionData} />
          </ul>
        </div>

        {/* Column3 */}
        <div className="w-[20%] px-3 max-[1017px]:w-[25%] max-[717px]:w-[45%] max-[717px]:px-0">
          <p className="footer-title">Trang tổng hợp</p>
          <ul>
            {footerCol31.map((item, index) => (
              <li key={index} className="footer-item">
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <p className="footer-title mt-12">Chính sách</p>
          <ul>
            {footerCol32.map((item, index) => (
              <li key={index} className="footer-item">
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 */}
        <div className="flex-1">
          <p className="footer-title">Sách đọc nhiều</p>
        </div>
      </div>

      <div className="border-t border-[#999999] py-1">
        <div className="container text-sm text-white flex items-center justify-between flex-wrap gap-2 max-[529px]:justify-center">
          <span className="uppercase my-2 text-center">
            © 2023 Kho Sách 247 - All rights reserved
          </span>

          <span>
            Được thiết kế & bảo trì bởi&nbsp;
            <a
              href="https://github.com/GiangLe1999"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              Giang Le
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
