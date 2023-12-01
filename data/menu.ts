import { path } from "@/constants";
import { IconType } from "react-icons";
import { IoMdListBox } from "react-icons/io";
import {
  MdAccountCircle,
  MdCategory,
  MdDashboard,
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
  { link: path.mainCategory, title: "Danh Mục Lớn", icon: MdCategory },
  { link: path.subCategory, title: "Danh Mục Con", icon: IoMdListBox },
];
