import Breadcrumbs from "@/components/breadcrumbs";
import NextImage from "@/components/next-image";
import { path } from "@/constants";
import { getBookBySlug } from "@/service/books.service";
import { NextPage } from "next";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import parse from "html-react-parser";
import BtnWithIcon from "@/components/btn-with-icon";
import { FaOpencart } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import ContainNextImage from "@/components/contain-next-image";
import slugify from "slugify";
import RelatedBooks from "@/components/book-page/related-books";
import Comments from "@/components/comments";
import BookRating from "@/components/book-rating";
import CategoryPageSidebar from "@/components/category-page/category-page-sidebar";
import BookGeneralInfo from "@/components/book-page/book-general-info";

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

      <div className="main-gradient mt-8 h-[300px] relative max-[1250px]:h-auto max-[1250px]:py-10 flex flex-col items-center">
        <div className="max-[1250px]:block relative hidden w-[300px] border aspect-[0.66] rounded-[5px] transition group-hover:-translate-y-2 shadow-[1px_1px_5px_#333] mb-6">
          <NextImage
            src={book?.cover.url || ""}
            alt={book?.name || ""}
            priority
            className="rounded-[5px]"
          />
        </div>

        <div className="hidden max-[1250px]:block text-center max-[1250px]:w-full max-[1250px]:px-4">
          <BookGeneralInfo book={book} />
        </div>
      </div>

      <div className="flex container -mt-56 max-[1250px]:mt-0 gap-16 max-[850px]:block">
        <div className="w-[340px] max-[850px]:w-full mx-auto">
          <div className="max-[1250px]:hidden relative block w-full border aspect-[0.66] rounded-[5px] transition group-hover:-translate-y-2 shadow-[1px_1px_5px_#333]">
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
            content="Mua Sách"
            customClasses="!w-full !block !mt-4 !text-lg"
            isFrontpage
            icon={FaOpencart}
            iconSize={20}
            iconCustomClasses="mr-2"
            external
            href={book?.shopeeLink}
          />

          <p className="mt-4 text-center pb-3 border-b text-gray-500 text-sm">
            Hoặc ủng hộ tác giả tại
          </p>

          <div className="grid grid-cols-3 gap-3 mt-4 pb-[18px] border-b text-gray-500">
            <div className="rounded border border-[#090785]">
              <a
                href={book?.lazadaLink}
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
                href={book?.tikiLink}
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
                href={book?.fahasaLink}
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

          <div className="text-gray-600">
            <h3 className="flex items-center py-3 border-b">
              <p className="w-1/2">Danh mục :</p>{" "}
              <Link
                href={`${path.category}${book?.mainCategory.slug}`}
                className="flex-1 font-bold text-primary hover:underline"
              >
                {book?.mainCategory.name}
              </Link>
            </h3>

            <h3 className="flex items-center py-3 border-b">
              <p className="w-1/2">Loại sách :</p>{" "}
              <Link
                href={`${path.category}${book?.mainCategory.slug}/${book?.subCategory.slug}`}
                className="flex-1 font-bold text-primary hover:underline"
              >
                {book?.subCategory.name}
              </Link>
            </h3>

            <h3 className="flex items-center py-3 border-b">
              <p className="w-1/2">Nhà xuất bản :</p>{" "}
              <Link
                href={`${path.publisher}${slugify(book?.publisher || "", {
                  lower: true,
                })}`}
                className="flex-1 font-bold text-primary hover:underline"
              >
                {book?.publisher}
              </Link>
            </h3>

            <h3 className="flex items-center py-3 border-b">
              <p className="w-1/2">Người đăng tải :</p>{" "}
              <Link
                href={`${path.administrator}${slugify(book?.author.name || "", {
                  lower: true,
                })}`}
                className="flex-1 font-bold text-primary hover:underline"
              >
                {book?.author.name}
              </Link>
            </h3>

            <BookRating bookId={book?._id || ""} />

            <div className="mt-4 max-[850px]:hidden">
              <CategoryPageSidebar />
            </div>
          </div>
        </div>

        <div className="relative z-[1] flex-1">
          <div className="max-[1250px]:hidden">
            <BookGeneralInfo book={book} />
          </div>

          <div className="prose text-black_text mt-16 max-[1250px]:mt-4 mb-6">
            {parse(book?.content || "")}
          </div>

          <div className="flex items-center gap-4 pb-6 border-b flex-wrap">
            <span className="font-bold">Thẻ liên quan:</span>
            <div className="flex items-center flex-wrap gap-4">
              {book?.tags.map((tag) => (
                <Link
                  className="text-gray-500 text-sm rounded border shadow px-2 pt-[6px] pb-2 leading-none hover:bg-primary font-bold hover:text-white transition duration-500"
                  key={tag}
                  href={`${path.tag}${slugify(tag, { lower: true })}`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="pb-10 border-b">
            <h3 className="h3-heading">Sách liên quan</h3>
            <RelatedBooks
              categoryId={book?.subCategory._id}
              currentId={book?._id}
            />
          </div>

          <div className="max-[850px]:pb-10 max-[850px]:border-b">
            <h3 className="h3-heading">Cảm nhận của bạn</h3>
            <Comments book={book} />
          </div>

          <div className="max-[850px]:block hidden">
            <h3 className="h3-heading">Gợi ý cho bạn</h3>
            <CategoryPageSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
