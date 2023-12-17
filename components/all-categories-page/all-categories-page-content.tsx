"use client";

import { FC, useEffect, useState } from "react";
import Breadcrumbs from "../breadcrumbs";
import Link from "next/link";
import { path } from "@/constants";
import { getAllMainCategoriesWithSubCategories } from "@/service/main-categories.service";
import { MainCategoryEntity } from "@/entities/main-category.entity";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CategoryPageSidebar from "../category-page/category-page-sidebar";

interface Props {}

const AllCategoriesPageContent: FC<Props> = (props): JSX.Element => {
  const [mainCategories, setMainCategories] = useState<
    MainCategoryEntity[] | undefined
  >([]);

  const [numOfSubCategories, setNumOfSubCategories] = useState(0);

  const [isFetching, setIsFetching] = useState(false);

  const fetchMainCategories = async () => {
    setIsFetching(true);
    const data = await getAllMainCategoriesWithSubCategories();
    setMainCategories(data?.mainCategories);
    setNumOfSubCategories(data?.numOfSubCategories || 0);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchMainCategories();
  }, []);
  return (
    <>
      <Breadcrumbs>
        <li>
          <Link
            href={path.allCategories}
            className="hover:underline text-primary font-semibold"
          >
            Danh mục
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
                    <h3 className="h3-heading">Tất cả Danh Mục</h3>
                    <p className="leading-8">
                      Tham khảo hàng ngàn tựa sách được chọn lọc và sắp xếp theo
                      từng danh mục tại Kho Sách 247.
                    </p>
                    <p className="mb-3 leading-8">
                      Hiện tại trang Kho Sách 247 đang có{" "}
                      <strong>{mainCategories?.length} danh mục lớn</strong> và{" "}
                      <strong>{numOfSubCategories} danh mục nhỏ</strong>. Bạn có
                      thể đọc online các tựa sách thuộc các danh mục hoặc
                      download dưới dạng PDF một cách miễn phí để tiện cho quá
                      trình sử dụng.
                    </p>
                  </>
                )}
              </>

              <>
                {isFetching ? (
                  <div className="grid grid-cols-4 gap-8">
                    {[...Array(8).keys()].map((item) => (
                      <Skeleton className="w-full aspect-[0.66]" key={item} />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-4 gap-6 mt-6 max-[700px]:grid-cols-2 max-[450px]:grid-cols-1">
                      {mainCategories?.map((mainCategory) => (
                        <div key={mainCategory._id} className="capitalize">
                          <h2 className="font-bold text-lg text-primary hover:underline">
                            <Link href={`${path.category}${mainCategory.slug}`}>
                              {mainCategory.name}
                            </Link>
                          </h2>

                          <ul className="list-disc space-y-2 ml-4 mt-2 marker:text-[#d1d5db]">
                            {mainCategory.subCategories.map((subCategory) => (
                              <li
                                key={subCategory._id}
                                className="hover:underline"
                              >
                                <Link
                                  href={`${path.category}${mainCategory.slug}/${subCategory.slug}`}
                                >
                                  {subCategory.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
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

export default AllCategoriesPageContent;
