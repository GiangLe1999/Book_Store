import { path } from "@/constants";
import { IconType } from "react-icons";
import { GiWhiteBook } from "react-icons/gi";
import { IoMdListBox } from "react-icons/io";
import {
  MdAccountCircle,
  MdCategory,
  MdDashboard,
  MdEditSquare,
  MdHome,
} from "react-icons/md";

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
