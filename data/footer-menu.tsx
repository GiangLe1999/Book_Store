import { path } from "@/constants";
import Link from "next/link";
import { mainHeaderItems } from "./menu";

export const footerCol1 = [
  { title: "Ngày thành lập: ", content: "Thứ  01/12/2023" },
  { title: "Website: ", content: "https://khosach247.com" },
  {
    title: "Địa chỉ: ",
    content: "16 Má Hai, phường Tân Hòa, TP. Buôn Ma Thuột, Đăk Lăk",
  },
  ,
];

export const footerAccordionData = [
  {
    header: (
      <Link href={`${path.category}lop-hoc`} className="footer-accordion-list">
        Lớp Học
      </Link>
    ),
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
    header: (
      <Link
        href={`${path.category}on-thi-dai-hoc`}
        className="footer-accordion-list"
      >
        Ôn Thi Đại Học
      </Link>
    ),
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
    header: (
      <Link href={`${path.category}kinh-te`} className="footer-accordion-list">
        Kinh Tế
      </Link>
    ),
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
    header: (
      <Link href={`${path.category}ki-nang`} className="footer-accordion-list">
        Kỹ Năng
      </Link>
    ),
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
    header: (
      <Link href={`${path.category}van-hoc`} className="footer-accordion-list">
        Văn Học
      </Link>
    ),
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
    header: (
      <Link
        href={`${path.category}tieng-anh`}
        className="footer-accordion-list"
      >
        Tiếng Anh
      </Link>
    ),
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
    header: (
      <Link
        href={`${path.category}ngoai-ngu-khac`}
        className="footer-accordion-list"
      >
        Ngoại Ngữ Khác
      </Link>
    ),
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
    header: (
      <Link href={`${path.category}truyen`} className="footer-accordion-list">
        Truyện
      </Link>
    ),
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
  { title: "Tất Cả Thẻ", link: path.allTags },
  { title: "Tất Cả NXB", link: path.allPublishers },
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
