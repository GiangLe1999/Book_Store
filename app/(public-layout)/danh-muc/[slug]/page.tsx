import BookCard from "@/components/book-card";
import Breadcrumbs from "@/components/breadcrumbs";
import CategoryBooks from "@/components/category-page/category-books";
import CategoryPageSidebar from "@/components/category-page/category-page-sidebar";
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

      <div className="main-gradient mt-8 relative pt-8 pb-10">
        <div className="container">
          <h1 className="text-white font-bold font-garamond text-4xl capitalize mb-4">
            Danh mục{" "}
            <span className="capitalize">{data?.mainCategory?.name}</span>
          </h1>

          <p className="text-white leading-9">
            {data?.mainCategory?.description}
          </p>

          <div className="flex items-center gap-x-[38px] mt-4 text-white flex-wrap gap-y-4">
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

      <div className="container">
        <h2 className="h3-heading">
          Sách mới nhất thuộc danh mục {data?.mainCategory.name}
        </h2>
        <div className="grid grid-cols-4 gap-8 pb-8 border-b max-[700px]:grid-cols-2">
          {data?.mainCategory?.books.map((book) => (
            <BookCard book={book} key={book._id} />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="flex gap-12 max-[1100px]:block">
          <div className="w-[70%] max-[1100px]:w-full max-[1100px]:pb-8 max-[1100px]:border-b">
            <div className="mb-12">
              <h3 className="h3-heading !mb-6">
                Danh mục con thuộc{" "}
                <span className="capitalize">{data?.mainCategory?.name}</span>
              </h3>
              <SubCategoriesList
                mainCategoryId={data?.mainCategory?._id}
                mainCategorySlug={params.slug}
              />
            </div>

            <div>
              <h3 className="h3-heading">Tìm hiểu thêm sách khác</h3>
              <CategoryBooks
                categoryId={data?.mainCategory?._id}
                isMainCategory
              />
            </div>
          </div>

          <div className="flex-1 max-[1100px]:mt-8 max-[1100px]:w-1/2 max-[1100px]:mx-auto max-[700px]:w-full">
            <h3 className="h3-heading">Gợi ý cho bạn</h3>
            <CategoryPageSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
