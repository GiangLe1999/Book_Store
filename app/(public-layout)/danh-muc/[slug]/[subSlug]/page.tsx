import BookCard from "@/components/book-card";
import Breadcrumbs from "@/components/breadcrumbs";
import CategoryBooks from "@/components/category-page/category-books";
import CategoryPageSidebar from "@/components/category-page/category-page-sidebar";
import { path } from "@/constants";
import { getSubCategoryBySlug } from "@/service/main-categories.service";
import { NextPage } from "next";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

interface Props {
  params: { subSlug: string; slug: string };
}

const page: NextPage<Props> = async ({ params }) => {
  const data = await getSubCategoryBySlug(params.subSlug);
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
            className="hover:underline"
          >
            {data?.subCategory?.mainCategory?.name}
          </Link>
        </li>
        <FaAngleRight size={14} className="mt-[2px]" />
        <li>
          <Link
            href={`${path.category}${params.slug}/${params.subSlug}`}
            className="hover:underline text-primary font-semibold"
          >
            {data?.subCategory?.name}
          </Link>
        </li>
      </Breadcrumbs>

      <div className="main-gradient mt-8 relative pt-8 pb-10 h-[350px]">
        <div className="container">
          <h1 className="text-white font-bold font-garamond text-4xl capitalize mb-4">
            Danh mục {data?.subCategory?.name}
          </h1>

          <p className="text-white leading-9">
            {data?.subCategory?.description}
          </p>

          <div className="flex items-center gap-[38px] mt-4 text-white">
            <p>
              • Số lượng sách :{" "}
              <span className="font-semibold">{data?.bookQuantity}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container grid grid-cols-4 gap-8 -mt-40 pb-8 border-b">
        {data?.subCategory?.books.map((book) => (
          <BookCard book={book} key={book._id} />
        ))}
      </div>

      <div className="container">
        <div className="flex gap-12">
          <div className="w-[70%]">
            <div>
              <h3 className="h3-heading">
                Sách thuộc danh mục{" "}
                <span className="capitalize">{data?.subCategory.name}</span>
              </h3>
              <CategoryBooks categoryId={data?.subCategory?._id} />
            </div>
          </div>

          <div className="flex-1 mt-10">
            <CategoryPageSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
