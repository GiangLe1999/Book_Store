import Breadcrumbs from "@/components/breadcrumbs";
import NextImage from "@/components/next-image";
import { path, shopeeRoot } from "@/constants";
import { getBookBySlug } from "@/service/books.service";
import { NextPage } from "next";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import moment from "moment";
import "moment/locale/vi";
import BookSocialShare from "@/components/book-page/book-social-share-btns";
import parse from "html-react-parser";
import BtnWithIcon from "@/components/btn-with-icon";
import { FaOpencart } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import ContainNextImage from "@/components/contain-next-image";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const book = await getBookBySlug(params.slug);

  return (
    <>
      <Breadcrumbs>
        <li>
          <Link href={path.allBooks} className="hover:underline">
            Sách
          </Link>
        </li>
        <FaAngleRight size={14} className="mt-[2px]" />
        <li>
          <Link
            href={`${path.book}${book?.slug}`}
            className="hover:underline text-primary font-semibold"
          >
            {book?.name}
          </Link>
        </li>
      </Breadcrumbs>

      <div className="main-gradient mt-8 h-[300px] relative"></div>

      <div className="flex container -mt-56 gap-16">
        <div>
          <div className="relative block w-[300px] border aspect-[0.66] rounded-[5px] transition group-hover:-translate-y-2 shadow-[1px_1px_5px_#333]">
            <NextImage
              src={book?.cover.url || ""}
              alt={book?.name || ""}
              priority
              className="rounded-[5px]"
            />
          </div>

          <BtnWithIcon
            content="Download PDF"
            customClasses="!block !mt-6 !text-lg !w-full"
            icon={MdFileDownload}
            iconSize={22}
            iconCustomClasses="mt-1"
            external
            href={book?.downloadLink}
          />

          <BtnWithIcon
            content="Mua Sách Giấy"
            customClasses="!w-full !block !mt-4 !text-lg"
            isFrontpage
            icon={FaOpencart}
            iconSize={20}
            iconCustomClasses="mr-2"
            external
            href={`${shopeeRoot}${book?.name}`}
          />

          <p className="mt-4 text-center pb-3 border-b text-gray-500 text-sm">
            Hoặc ủng hộ tác giả tại
          </p>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="rounded border border-[#090785]">
              <a
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded relative w-[90%] h-10 mx-auto"
              >
                <ContainNextImage
                  src="/assets/images/icons/logo-lazada.png"
                  alt="Link mua sách tại Lazada"
                />
              </a>
            </div>

            <div className="rounded border border-[#00aaf0]">
              <a
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded relative w-[90%] h-10 mx-auto"
              >
                <ContainNextImage
                  src="/assets/images/icons/logo-tiki.png"
                  alt="Link mua sách tại Tiki"
                />
              </a>
            </div>

            <div className="rounded border border-[#e81523]">
              <a
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded relative w-[90%] h-10 mx-auto"
              >
                <ContainNextImage
                  src="/assets/images/icons/fahasa-logo.png"
                  alt="Link mua sách tại Fahasa"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-[1] flex-1">
          <h1 className="font-bold text-3xl text-white">{book?.name}</h1>
          <h2 className="mt-4 text-white">
            Tác giả :{" "}
            <Link href="" className="font-semibold hover:underline">
              {book?.realAuthor}
            </Link>
          </h2>
          <p className="mt-4 text-white">
            Ngày đăng :{" "}
            <span className="font-semibold">
              {moment(book?.createdAt).format("DD/MM/YYYY")}
            </span>
          </p>

          <div className="mt-6 text-white">
            <BookSocialShare
              slug={book?.slug || ""}
              title={book?.name || ""}
              quote={book?.name || ""}
            />
          </div>

          <div className="prose text-black_text mt-16">
            {parse(book?.content || "")}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
