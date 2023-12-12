"use client";

import { MainCategoryEntity } from "@/entities/main-category.entity";
import { getAllMainCategoriesWithBooks } from "@/service/main-categories.service";
import { FC, useEffect, useState } from "react";
import SectionHeading from "../section-heading";
import { path } from "@/constants";
import MainCategoriesSkeletons from "./main-categories-skeletons";
import BooksSwiper from "../books-swiper";

interface Props {}

const BookMainCategories: FC<Props> = (props): JSX.Element => {
  const [mainCategories, setMainCategories] = useState<
    MainCategoryEntity[] | undefined
  >([]);

  const [isFetching, setIsFetching] = useState(false);

  const fetchMainCategories = async () => {
    setIsFetching(true);
    const fetchedMainCategories = await getAllMainCategoriesWithBooks();
    setMainCategories(fetchedMainCategories);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchMainCategories();
  }, []);

  return (
    <>
      {isFetching ? (
        <>
          {[...Array(8).keys()].map((item) => (
            <MainCategoriesSkeletons key={item} />
          ))}
        </>
      ) : (
        <>
          {mainCategories?.map((mainCategory) => (
            <section key={mainCategory._id} className="mt-[45px]">
              <div className="container">
                <SectionHeading
                  heading={`Sách ${mainCategory.name}`}
                  link={`${path.category}${mainCategory.slug}`}
                />

                <div className="mt-4">
                  <BooksSwiper books={mainCategory.books} />
                </div>
              </div>
            </section>
          ))}
        </>
      )}
    </>
  );
};

export default BookMainCategories;
