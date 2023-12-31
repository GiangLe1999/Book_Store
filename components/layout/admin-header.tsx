import { toggleSidebar } from "@/redux/slices/admin-sidebar-slice";
import { FC } from "react";
import { MdViewList } from "react-icons/md";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { HiUser } from "react-icons/hi";
import { IoMdHome } from "react-icons/io";
import { RootState } from "@/redux/store";
import { path } from "@/constants";

interface Props {}

const AdminHeader: FC<Props> = (): JSX.Element => {
  const isExpand = useSelector((state: RootState) => state.adminSidebar.expand);

  const dispatch = useDispatch();
  return (
    <div className={`${isExpand ? "ml-[260px]" : "ml-[80px]"}`}>
      <header className="px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="w-10 h-10 admin-item-shadow grid place-items-center border-admin_gray_text rounded-full bg-white text-admin_gray_text"
        >
          {isExpand ? (
            <FaAngleDoubleLeft size={20} />
          ) : (
            <MdViewList size={22} />
          )}
        </button>

        <div className="flex items-center gap-4">
          <Link href="/" className="flex gap-1 uppercase text-sm font-bold">
            <IoMdHome size={20} className="-mt-[2px]" />
            Đến Blog
          </Link>
          <Link
            href={path.profile}
            className="flex gap-1 uppercase text-sm font-bold"
          >
            <HiUser size={18} className="-mt-[1px]" />
            Thông tin cá nhân
          </Link>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
