"use client";

import { SubCategoryEntity } from "@/entities/sub-category.entity";
import { getSameTypeSubCategories } from "@/service/sub-categories.service";
import { FC, useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { path } from "@/constants";

interface Props {
  mainCategoryId: string | undefined;
  mainCategorySlug: string | undefined;
}

const SubCategoriesList: FC<Props> = ({
  mainCategoryId,
  mainCategorySlug,
}): JSX.Element => {
  const [subCategories, setSubCategories] = useState<
    SubCategoryEntity[] | undefined
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubCategories = async () => {
    if (!mainCategoryId) {
      return;
    }

    setIsLoading(true);
    const subCategories = await getSameTypeSubCategories(mainCategoryId);
    setSubCategories(subCategories);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-6 gap-4">
          {[...Array(12).keys()].map((item) => (
            <Skeleton className="w-full h-[35px]" key={item} />
          ))}
        </div>
      ) : (
        <>
          {subCategories && subCategories?.length > 0 ? (
            <div className="flex items-center gap-4 flex-wrap">
              {subCategories?.map((subCategory) => (
                <Link
                  href={`${path.category}${mainCategorySlug}/${subCategory.slug}`}
                  key={subCategory._id}
                  className="text-gray-500 text-sm rounded border shadow px-4 pt-2 pb-[10px] leading-none hover:bg-primary font-bold hover:text-white transition duration-500"
                >
                  {subCategory.name} ({subCategory.books.length} sách)
                </Link>
              ))}
            </div>
          ) : (
            <p>Không tìm thấy sách phù hợp</p>
          )}
        </>
      )}
    </>
  );
};

export default SubCategoriesList;
