import { path } from "@/constants";
import Link from "next/link";
import { mainHeaderItems } from "./menu";

export const footerCol1 = [
  { title: "Ngày thành lập: ", content: "Thứ  01/12/2023" },
  { title: "Địa chỉ website: ", content: "https://khosach247.com" },
  {
    title: "Địa chỉ: ",
    content: "16 Má Hai, phường Tân Hòa, TP. Buôn Ma Thuột, Đăk Lăk",
  },
  ,
];

export const footerAccordionData = [
  {
    header: "Lớp Học",
    content: (
      <ul className="footer-accordion-list">
        {mainHeaderItems[0].children.map((child) => (
          <li key={child.name}>
            <Link href={`${path.category}${child.slug}`}>{child.name}</Link>
          </li>
        ))}
      </ul>
    ),
  },
  {
    header: "Ôn Thi Đại Học",
    content: (
      <ul className="footer-accordion-list">
        <ul className="footer-accordion-list">
          {mainHeaderItems[1].children.map((child) => (
            <li key={child.name}>
              <Link href={`${path.category}${child.slug}`}>{child.name}</Link>
            </li>
          ))}
        </ul>
      </ul>
    ),
  },
  {
    header: "Kinh Tế",
    content: (
      <ul className="footer-accordion-list">
        <ul className="footer-accordion-list">
          {mainHeaderItems[2].children.map((child) => (
            <li key={child.name}>
              <Link href={`${path.category}${child.slug}`}>{child.name}</Link>
            </li>
          ))}
        </ul>
      </ul>
    ),
  },
  {
    header: "Kỹ Năng",
    content: (
      <ul className="footer-accordion-list">
        {mainHeaderItems[3].children.map((child) => (
          <li key={child.name}>
            <Link href={`${path.category}${child.slug}`}>{child.name}</Link>
          </li>
        ))}
      </ul>
    ),
  },
  {
    header: "Văn Học",
    content: (
      <ul className="footer-accordion-list">
        {mainHeaderItems[4].children.map((child) => (
          <li key={child.name}>
            <Link href={`${path.category}${child.slug}`}>{child.name}</Link>
          </li>
        ))}
      </ul>
    ),
  },
  {
    header: "Tiếng Anh",
    content: (
      <ul className="footer-accordion-list">
        {mainHeaderItems[5].children.map((child) => (
          <li key={child.name}>
            <Link href={`${path.category}${child.slug}`}>{child.name}</Link>
          </li>
        ))}
      </ul>
    ),
  },
  {
    header: "Ngoại Ngữ Khác",
    content: (
      <ul className="footer-accordion-list">
        {mainHeaderItems[6].children.map((child) => (
          <li key={child.name}>
            <Link href={`${path.category}${child.slug}`}>{child.name}</Link>
          </li>
        ))}
      </ul>
    ),
  },
  {
    header: "Truyện",
    content: (
      <ul className="footer-accordion-list">
        {mainHeaderItems[7].children.map((child) => (
          <li key={child.name}>
            <Link href={`${path.category}${child.slug}`}>{child.name}</Link>
          </li>
        ))}
      </ul>
    ),
  },
];

export const footerCol31 = [
  { title: "Tất Cả Sách", link: path.allBooks },
  { title: "Tất Cả Danh Mục", link: path.allCategories },
  { title: "Blog", link: path.allArticles },
];

export const footerCol32 = [
  { title: "Bản Quyền Nội Dung", link: path.copyrights },
  { title: "Chính Sách Bảo Mật", link: path.privacy },
  {
    title: "Quy Định Sử Dụng",
    link: path.procedure,
  },
  {
    title: "Chính Sách Bảo Mật",
    link: path.privacy,
  },
];

export const footerCol4 = [
  { title: "Hotline: ", content: "0962334807", link: "tel:0962334807" },
  {
    title: "Email: ",
    content: "legiangbmt09@gmail.com",
    link: "legiangbmt09@gmail.com",
  },
];
