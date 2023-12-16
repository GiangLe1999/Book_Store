import Breadcrumbs from "@/components/breadcrumbs";
import NextImage from "@/components/next-image";
import { path } from "@/constants";
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
import slugify from "slugify";
import { StarRating } from "@/components/star-rating";
import RelatedBooks from "@/components/book-page/related-books";
import Comments from "@/components/comments";
import BookRating from "@/components/book-rating";

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
          </div>
        </div>

        <div className="relative z-[1] flex-1">
          <h1 className="font-bold text-3xl text-white">{book?.name}</h1>
          <div className="flex items-center gap-8 mt-4 text-white">
            <h2>
              Tác giả :{" "}
              <Link
                href={`${path.author}${slugify(book?.realAuthor || "", {
                  lower: true,
                })}`}
                className="font-semibold hover:underline"
              >
                {book?.realAuthor}
              </Link>
            </h2>
            <div className="flex items-center gap-2">
              Đánh giá : <StarRating defaultRating={book?.ratings} readonly />
              <span className="font-bold">
                ({book?.ratings} / {book?.numOfRatings} đánh giá)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-[38px] mt-4 text-white">
            <p>
              Ngày đăng :{" "}
              <span className="font-semibold">
                {moment(book?.createdAt).format("DD/MM/YYYY")}
              </span>
            </p>{" "}
            <p>
              Lượt xem : <span className="font-semibold">{book?.views}</span>
            </p>
          </div>

          <div className="mt-6 text-white">
            <BookSocialShare
              slug={book?.slug || ""}
              title={book?.name || ""}
              quote={book?.name || ""}
            />
          </div>

          <div className="prose text-black_text mt-16 mb-6">
            {parse(book?.content || "")}
          </div>

          <div className="flex items-center gap-4 pb-6 border-b">
            <span className="font-bold">Thẻ liên quan:</span>
            <div className="flex items-center gap-4">
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

          <div>
            <h3 className="h3-heading">Cảm nhận của bạn</h3>

            <Comments book={book} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
