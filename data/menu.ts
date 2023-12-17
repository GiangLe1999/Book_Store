import Link from "next/link";
import { path } from "@/constants";
import { IconType } from "react-icons";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaTumblr,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GiWhiteBook } from "react-icons/gi";
import { IoMdListBox } from "react-icons/io";
import {
  MdAccountCircle,
  MdCategory,
  MdDashboard,
  MdEditSquare,
  MdHome,
  MdMail,
  MdPhone,
} from "react-icons/md";
import { ReactNode } from "react";

export const adminSidebarItems: {
  link: string;
  title: string;
  icon: IconType;
}[] = [
  { link: "/", title: "Đến Blog", icon: MdHome },
  { link: path.dashboard, title: "Dashboard", icon: MdDashboard },
  { link: path.profile, title: "Profile", icon: MdAccountCircle },
  { link: path.adminMainCategories, title: "Danh Mục Lớn", icon: MdCategory },
  { link: path.adminSubCategories, title: "Danh Mục Con", icon: IoMdListBox },
  { link: path.adminBooks, title: "Sách", icon: GiWhiteBook },
  { link: path.adminArticles, title: "Bài viết", icon: MdEditSquare },
];

export const topHeaderItems = [
  {
    name: "Gia đình",
    slug: "gia-dinh",
    children: [
      { name: "Ẩm thực - Nấu ăn", slug: "am-thuc-nau-an" },
      { name: "Ẩm thực - Nuôi dạy con", slug: "nuoi-day-con" },
    ],
  },
  {
    name: "Tử vi phong thủy",
    slug: "tu-vi-phong-thuy",
    children: [
      { name: "Tử vi", slug: "tu-vi" },
      { name: "Phong thủy", slug: "phong-thuy" },
    ],
  },
  {
    name: "Nông - lâm - ngư nghiệp",
    slug: "nong-lam-ngu-nghiep",
    children: [
      { name: "Nông nghiệp", slug: "nong-nghiep" },
      { name: "Lâm nghiệp", slug: "lam-nghiep" },
      { name: "Ngư nghiệp", slug: "ngu-nghiep" },
      { name: "Cây cảnh cây thế", slug: "cay-canh-cay-the" },
    ],
  },
  {
    name: "Khoa học - Kỹ thuật",
    slug: "khoa-hoc-ky-thuat",
  },
];

export const mainHeaderItems = [
  {
    name: "Lớp học",
    slug: "lop-hoc",
    children: [
      { name: "Lớp 1", slug: "lop-1" },
      { name: "Lớp 2", slug: "lop-2" },
      { name: "Lớp 3", slug: "lop-3" },
      { name: "Lớp 4", slug: "lop-4" },
      { name: "Lớp 5", slug: "lop-5" },
      { name: "Lớp 6", slug: "lop-6" },
      { name: "Lớp 7", slug: "lop-7" },
      { name: "Lớp 8", slug: "lop-8" },
      { name: "Lớp 9", slug: "lop-9" },
      { name: "Lớp 10", slug: "lop-10" },
      { name: "Lớp 11", slug: "lop-11" },
      { name: "Lớp 12", slug: "lop-12" },
    ],
  },
  {
    name: "Ôn thi đại học",
    slug: "on-thi-dai-hoc",
    children: [
      { name: "Toán học", slug: "toan-hoc" },
      { name: "Vật lý", slug: "vat-ly" },
      { name: "Hóa học", slug: "hoa-hoc" },
      { name: "Sinh học", slug: "sinh-hoc" },
      { name: "Lịch sử", slug: "lich-su" },
      { name: "Địa lý", slug: "dia-ly" },
      { name: "Giáo dục công dân", slug: "giao-duc-cong-dan" },
      { name: "Ngoại ngữ", slug: "ngoai-ngu" },
    ],
  },
  {
    name: "Kinh tế",
    slug: "kinh-te",
    children: [
      { name: "Đầu tư chứng khoán", slug: "dau-tu-chung-khoan" },
      { name: "Khởi nghiệp làm giàu", slug: "khoi-nghiep-lam-giau" },
      { name: "Kỹ năng làm việc", slug: "ky-nang-lam-viec" },
      { name: "Marketing - bán hàng", slug: "marketing-ban-hang" },
      {
        name: "Nhân vật - bài học kinh doanh",
        slug: "nhan-vat-bai-hoc-kinh-doanh",
      },
      { name: "Quản trị lãnh đạo", slug: "quan-tri-lanh-dao" },
    ],
  },
  {
    name: "Kỹ năng",
    slug: "ki-nang",
    children: [
      { name: "Hạt giống tâm hồn", slug: "hat-giong-tam-hon" },
      { name: "Kỹ năng giao tiếp", slug: "ky-nang-giao-tiep" },
      { name: "Kỹ năng học tập", slug: "ky-nang-học-tap" },
      { name: "Kỹ năng sống", slug: "ky-nang-song" },
      { name: "Nghệ thuật sống đẹp", slug: "nghe-thuat-song-dep" },
    ],
  },
  {
    name: "Văn học",
    slug: "van-hoc",
    children: [
      { name: "Tiểu sử - hồi ký", slug: "tieu-su-hoi-ky" },
      { name: "Văn học thiếu nhi", slug: "van-hoc-thieu-nhi" },
      { name: "Văn học Việt Nam", slug: "van-hoc-viet-nam" },
      { name: "Văn học nước ngoài", slug: "van-hoc-nuoc-ngoai" },
    ],
  },
  {
    name: "Tiếng anh",
    slug: "tieng-anh",
    children: [
      { name: "Sách Toeic", slug: "sach-toeic" },
      { name: "Sách Toefl", slug: "sach-toefl" },
    ],
  },
  {
    name: "Ngoại ngữ khác",
    slug: "ngoai-ngu",
    children: [
      { name: "Tiếng hàn quốc", slug: "tieng-han-quoc" },
      { name: "Tiếng nhật", slug: "tieng-nhat" },
      { name: "Tiếng pháp", slug: "tieng-phap" },
      { name: "Tiếng trung", slug: "tieng-trung" },
    ],
  },
  {
    name: "Truyện",
    slug: "truyen",
    children: [
      {
        name: "Truyện cổ tích việt nam",
        slug: "truyen-co-tich-viet-nam",
      },
      {
        name: "Truyện cổ tích nước ngoài",
        slug: "truyen-co-tich-nuoc-ngoai",
      },
      { name: "Truyện ngụ ngôn", slug: "truyen-ngu-ngon" },
      { name: "Truyện dân gian", slug: "truyen-dan-gian" },
      { name: "Truyện tranh", slug: "truyen-tranh" },
    ],
  },
];

export const socialItems = [
  { icon: FaFacebookF, link: "https://www.facebook.com/giang.lethanh.5015/" },
  { icon: FaXTwitter, link: "https://www.facebook.com/giang.lethanh.5015/" },
  { icon: FaLinkedinIn, link: "https://www.facebook.com/giang.lethanh.5015/" },
  { icon: FaPinterestP, link: "https://www.facebook.com/giang.lethanh.5015/" },
  { icon: FaTumblr, link: "https://www.facebook.com/giang.lethanh.5015/" },
];

export const homeMainChoices = [
  {
    icon: "sach-danh-muc-lop-hoc.svg",
    title: "Sách ôn thi Đại học",
    desc: "Tăng level nhanh chóng với hàng trăm bộ sách ôn luyện thi THPT quốc gia 2024 cho học sinh 2K5, có thể đọc online hoặc download miễn phí PDF.",
    slug: "on-thi-dai-hoc",
  },
  {
    icon: "danh-muc-sach-tieng-anh.png",
    title: "Sách luyện thi Tiếng Anh",
    desc: "Tài liệu TOEIC, TOELF đầy đủ nhất, sát đề thi thật nhất, cập nhật liên tục, có thể đọc online hoặc download miễn phí để tiện sử dụng.",
    slug: "tieng-anh",
  },
  {
    icon: "danh-muc-sach-thieu-nhi.jpg",
    title: "Sách cho Thiếu nhi",
    desc: "Sách, truyện được viết cho trẻ em ở độ tuổi tiểu học với nội dung sinh động, giàu sức tưởng tượng, có thể đọc online hoặc download miễn phí.",
    slug: "thieu-nhi",
  },
];

export const sortByArray = [
  { label: "Lượt xem nhiều", value: "view" },
  { label: "Điểm đánh giá", value: "ratings" },
  { label: "Từ mới đến cũ", value: "newest" },
  { label: "Từ cũ đến mới", value: "oldest" },
];
