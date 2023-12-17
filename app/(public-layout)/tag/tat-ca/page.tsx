"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import CategoryPageSidebar from "@/components/category-page/category-page-sidebar";
import { path } from "@/constants";
import { getAllTags } from "@/service/tags.service";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import slugify from "slugify";

interface Props {}

const AllTagsPage: NextPage<Props> = () => {
  const [tags, setTags] = useState<string[] | undefined>([]);

  const [isFetching, setIsFetching] = useState(false);

  const fetchTags = async () => {
    setIsFetching(true);
    const tags = await getAllTags();
    setTags(tags);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchTags();
  }, []);
  return (
    <>
      <Breadcrumbs>
        <li>
          <Link
            href={path.allTags}
            className="hover:underline text-primary font-semibold"
          >
            Thẻ
          </Link>
        </li>
      </Breadcrumbs>

      <div className="container">
        <div className="flex gap-12 max-[1100px]:block">
          <div className="w-[70%] max-[1100px]:w-full max-[1100px]:pb-8 max-[1100px]:border-b">
            <div>
              <>
                {isFetching ? (
                  <>
                    <Skeleton
                      width="200px"
                      height="30px"
                      className="mt-6 mb-4"
                    />
                    <Skeleton width="100%" height="100px" className="mb-4" />
                  </>
                ) : (
                  <>
                    <h1 className="h3-heading">Tất cả thẻ ({tags?.length})</h1>
                    <p className="leading-8">
                      Tham khảo hàng ngàn tựa sách được chọn lọc và sắp xếp theo
                      các thẻ liên quan tại Kho Sách 247.
                    </p>
                    <p className="mb-3 leading-8">
                      Hiện tại trang Kho Sách 247 đang phân loại sách theo{" "}
                      <strong>{tags?.length} thẻ</strong>. Bạn có thể đọc online
                      hoặc download dưới dạng PDF các tựa sách thuộc từng thẻ
                      một cách miễn phí để tiện cho quá trình sử dụng.
                    </p>
                  </>
                )}
              </>

              <>
                {isFetching ? (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
                    {[...Array(21).keys()].map((item) => (
                      <Skeleton className="w-full h-[30px]" key={item} />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-6 mt-6">
                      {tags?.map((tag) => (
                        <div key={tag} className="">
                          <Link
                            className="text-gray-500 text-sm rounded border shadow px-2 pt-[6px] pb-2 leading-none hover:bg-primary font-bold hover:text-white transition duration-500"
                            key={tag}
                            href={`${path.tag}${slugify(tag, { lower: true })}`}
                          >
                            {tag}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
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

export default AllTagsPage;
