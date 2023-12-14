import BookCard from "@/components/book-card";
import Breadcrumbs from "@/components/breadcrumbs";
import CategoryBooks from "@/components/category-page/category-books";
import SubCategoriesList from "@/components/main-category-page/sub-categories-list";
import { path } from "@/constants";
import { getMainCategoryBySlug } from "@/service/main-categories.service";
import { NextPage } from "next";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

interface Props {
  params: { slug: string };
}

const Page: NextPage<Props> = async ({ params }) => {
  const data = await getMainCategoryBySlug(params.slug);

  return (
    <>
      <Breadcrumbs>
        <li>
          <Link href={path.allCategories} className="hover:underline">
            Danh mục
          </Link>
        </li>
        <FaAngleRight size={14} className="mt-[2px]" />
        <li>
          <Link
            href={`${path.category}${params.slug}`}
            className="hover:underline text-primary font-semibold"
          >
            {data?.mainCategory?.name}
          </Link>
        </li>
      </Breadcrumbs>

      <div className="main-gradient mt-8 relative pt-8 pb-10 h-[350px]">
        <div className="container">
          <h1 className="text-white font-bold font-garamond text-4xl capitalize mb-4">
            Danh mục {data?.mainCategory?.name}
          </h1>

          <p className="text-white leading-9">
            {data?.mainCategory?.description}
          </p>

          <div className="flex items-center gap-[38px] mt-4 text-white">
            <p>
              • Số lượng danh mục con :{" "}
              <span className="font-semibold">
                {data?.mainCategory?.subCategories.length}
              </span>
            </p>{" "}
            <p>
              • Số lượng sách :{" "}
              <span className="font-semibold">{data?.bookQuantity}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container grid grid-cols-4 gap-8 -mt-40 pb-8 border-b">
        {data?.mainCategory?.books.map((book) => (
          <BookCard book={book} key={book._id} />
        ))}
      </div>

      <div className="container">
        <div className="flex">
          <div className="w-[70%]">
            <div className="mb-12">
              <h3 className="h3-heading !mb-6">
                Danh mục con của{" "}
                <span className="capitalize">{data?.mainCategory.name}</span>
              </h3>
              <SubCategoriesList
                mainCategoryId={data?.mainCategory?._id}
                mainCategorySlug={params.slug}
              />
            </div>

            <div>
              <h3 className="h3-heading">
                Sách thuộc danh mục{" "}
                <span className="capitalize">{data?.mainCategory.name}</span>
              </h3>
              <CategoryBooks
                categoryId={data?.mainCategory?._id}
                isMainCategory
              />
            </div>
          </div>

          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default Page;
