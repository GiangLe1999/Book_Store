import AdminBooks from "@/components/administrator-page/admin-books";
import BtnWithIcon from "@/components/btn-with-icon";
import CategoryPageSidebar from "@/components/category-page/category-page-sidebar";
import NextImage from "@/components/next-image";
import UserAvatar from "@/components/user-avatar";
import { domain } from "@/constants";
import { getUserProfileBySlug } from "@/service/user.service";
import { NextPage } from "next";
import { FaUserCog, FaUserEdit } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const user = await getUserProfileBySlug(params.slug);

  return (
    <>
      <div className="pt-24 pb-20 bg-white border-b -mt-[50px]">
        <div className="container flex items-center gap-8 max-[880px]:block">
          <div
            className={`w-[220px] h-[220px] rounded-full overflow-hidden relative border shadow max-[880px]:mb-6`}
          >
            <NextImage
              src={
                user?.avatar?.url || "/assets/images/admin/default-user-avt.png"
              }
              alt={user?.name || ""}
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between max-[1250px]:block">
              <div className="flex items-center gap-3 max-[1250px]:mb-4 max-[430px]:block">
                <h1 className="text-black_text font-black text-3xl leading-10 tracking-wide font-arima">
                  {user?.name}
                </h1>

                <div className="flex items-center gap-3 max-[430px]:mt-2">
                  <span className="py-1 px-3 bg-[#eeebfd] text-xs text-[#382c95] font-semibold flex items-center gap-1 rounded-md">
                    <FaUserCog className="-mt-[1px]" /> Admin
                  </span>
                  <span className="py-1 px-3 bg-[#e0f0fc] text-xs text-[#294ca5] font-semibold flex items-center gap-1 rounded-md">
                    <FaUserEdit className="-mt-[1px]" /> Người đăng
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 max-[1250px]:mb-6">
                <a
                  href={user?.facebook || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-10 h-10 relative"
                >
                  <NextImage
                    src="/assets/images/icons/facebook.png"
                    alt="Facebook link"
                  />
                </a>
                <a
                  href={user?.twitter || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-10 h-10 relative"
                >
                  <NextImage
                    src="/assets/images/icons/twitter.png"
                    alt="Twitter link"
                  />
                </a>
                <a
                  href={user?.linkedin || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-10 h-10 relative"
                >
                  <NextImage
                    src="/assets/images/icons/linkedin.png"
                    alt="Linkedin link"
                  />
                </a>
                <a
                  href={user?.youtube || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-10 h-10 relative"
                >
                  <NextImage
                    src="/assets/images/icons/youtube.png"
                    alt="Youtube link"
                  />
                </a>
                <a
                  href={""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-10 h-10 relative"
                >
                  <NextImage
                    src="/assets/images/icons/instagram.png"
                    alt="Instagram link"
                  />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 max-[610px]:block">
              <h2 className="text-gray-600">
                Quản trị viên và Tác giả tại <strong>{domain}</strong>
              </h2>
              <span className="max-[610px]:hidden">|</span>
              <p className="flex items-center gap-[2px] text-gray-600 max-[610px]:mt-3">
                <MdLocationPin className="-mt-[1px]" /> TP. Hồ Chí Minh, Việt
                Nam
              </p>
            </div>

            <p className="text-gray-600 leading-8">{user?.description}</p>

            <BtnWithIcon
              href={`mailto:${user?.email}`}
              content="Liên hệ qua Email"
              icon={IoMdMail}
              external
              customClasses="block !w-fit !mt-3 max-[400px]:!w-full"
              isFrontpage
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex gap-12">
          <div className="w-[70%]">
            <h3 className="h3-heading">Sách do {user?.name} đăng tải</h3>
            <AdminBooks userId={user?._id} />
          </div>

          <div className="flex-1 mt-10">
            <CategoryPageSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;