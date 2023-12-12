import BtnWithIcon from "@/components/btn-with-icon";
import ContainNextImage from "@/components/contain-next-image";
import BookMainCategories from "@/components/home-page/book-main-categories";
import ThreeBooks from "@/components/home-page/three-books";
import NextImage from "@/components/next-image";
import SectionHeading from "@/components/section-heading";
import { homeBannerUrl, path } from "@/constants";
import { homeMainChoices } from "@/data/menu";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section>
        <div className="grid grid-cols-2 container">
          <div className="flex flex-col -mt-[30px] justify-center">
            <h1 className="font-garamond text-[50px] mb-4 text-dark_blue leading-tight tracking-tight">
              Kho Sách 247 - Thư viện PDF miễn phí của bạn
            </h1>
            <h2 className="text-lg text-dark_blue mb-2">
              Chia sẻ miễn phí Ebooks đến cộng đồng yêu thích đọc sách. Mọi
              thông tin và hình ảnh trên website đều được sưu tầm trên Internet.
              Nếu bạn có điều kiện, hãy mua sách giấy để ủng hộ Tác giả và Nhà
              xuất bản nhé!
            </h2>
            <BtnWithIcon
              content="Tham khảo toàn bộ sách tại đây"
              customClasses="!w-fit !text-lg mt-3"
              iconBehind={FaArrowRightLong}
              iconCustomClasses="ml-2 mt-[2px]"
              iconSize={14}
              isFrontpage
            />
          </div>
          <div className="w-full aspect-[0.9708] relative">
            <NextImage
              src={homeBannerUrl}
              alt="Banner trang chủ Kho sách 247"
            />
          </div>
        </div>
      </section>

      <section className="mt-[30px]">
        <div className="container grid grid-cols-3 gap-16">
          {homeMainChoices.map((choice, index: number) => (
            <>
              <Link
                href={`${path.category}${choice.slug}`}
                key={index}
                className="block group"
              >
                <div className="relative w-[100px] aspect-square">
                  <ContainNextImage
                    src={`/assets/images/home/${choice.icon}`}
                    alt={choice.title}
                  />
                </div>
                <h3 className="font-garamond text-2xl text-dark_blue mt-2">
                  {choice.title}
                </h3>
                <h4 className="text-light_text mt-2 leading-8">
                  {choice.desc}
                </h4>

                <span className="text-primary font-semibold text-lg mt-2 flex items-center gap-2 group-hover:translate-x-4 transition">
                  Xem tất cả <FaArrowRightLong size={12} className="mt-[2px]" />
                </span>
              </Link>
            </>
          ))}
        </div>
      </section>

      <section className="main-gradient mt-[45px]">
        <div className="flex items-center gap-8 container py-14">
          <div className="text-white w-[40%]">
            <h3 className="text-3xl leading-relaxed font-garamond">
              Download trọn Bộ PDF Sách Giáo Khoa Lớp 1 - Lớp 12 hoàn toàn miễn
              phí
            </h3>
            <Link
              href={`${path.category}lop-hoc`}
              className="flex items-center bg-white rounded w-fit text-primary py-3 px-4 font-bold text-lg mt-3 hover:scale-105 transition duration-500"
            >
              Xem thêm tại đây{" "}
              <FaArrowRightLong className="ml-2 mt-[2px]" size={14} />
            </Link>
          </div>

          <div className="flex-1">
            <ThreeBooks />
          </div>
        </div>
      </section>

      <BookMainCategories />
    </>
  );
}
