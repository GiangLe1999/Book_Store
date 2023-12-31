/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import BooksList from "@/components/books-list";
import Breadcrumbs from "@/components/breadcrumbs";
import CategoryPageSidebar from "@/components/category-page/category-page-sidebar";
import FormOptimizedSelect from "@/components/form-optimized-select";
import { path } from "@/constants";
import { sortByArray } from "@/data/menu";
import { ISelectOption } from "@/dtos/common.dto";
import { BookEntity } from "@/entities/book.entity";
import { getBooksByFilter } from "@/service/books.service";
import { getAllMainCategories } from "@/service/main-categories.service";
import { getSameTypeSubCategories } from "@/service/sub-categories.service";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
interface Props {}

const AllBooksPageContent: FC<Props> = (props): JSX.Element => {
  const [books, setBooks] = useState<BookEntity[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [mainCategories, setMainCategories] = useState<ISelectOption[]>();
  const [subCategories, setSubCategories] = useState<ISelectOption[]>();

  const [sortBy, setSortBy] = useState<ISelectOption>({ value: "", label: "" });
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<ISelectOption>({
      value: "",
      label: "",
    });

  const [selectedSubCategory, setSelectedSubCategory] = useState<ISelectOption>(
    {
      value: "",
      label: "",
    }
  );

  const fetchBooks = async () => {
    setIsLoading(true);
    const data = await getBooksByFilter(
      selectedMainCategory.value,
      selectedSubCategory.value,
      sortBy.value,
      currentPage,
      8
    );
    setBooks(data?.books || []);
    setTotalPages(data?.totalPages || 1);
    setIsLoading(false);
  };

  const fetchMainCategoriesData = async () => {
    const rawMainCategories = await getAllMainCategories("name");

    const formattedMainCategories = rawMainCategories?.map((mainCategory) => ({
      label: mainCategory.name,
      value: mainCategory._id.toString(),
    }));

    setMainCategories(formattedMainCategories);
  };

  useEffect(() => {
    fetchMainCategoriesData();
  }, []);

  const fetchSubCategoriesData = async () => {
    const rawSubCategories = await getSameTypeSubCategories(
      selectedMainCategory.value
    );

    const formattedSubCategories = rawSubCategories?.map((subCategory) => ({
      label: subCategory.name,
      value: subCategory._id.toString(),
    }));

    setSubCategories(formattedSubCategories);
  };

  useEffect(() => {
    fetchSubCategoriesData();
  }, [selectedMainCategory]);

  useEffect(() => {
    fetchBooks();
  }, [
    currentPage,
    selectedMainCategory.value,
    selectedSubCategory.value,
    sortBy.value,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMainCategory.value, selectedSubCategory.value, sortBy.value]);
  return (
    <>
      <Breadcrumbs>
        <li>
          <Link
            href={path.allBooks}
            className="hover:underline text-primary font-semibold"
          >
            Sách
          </Link>
        </li>
      </Breadcrumbs>

      <div className="container">
        <div className="flex gap-12 max-[1100px]:block">
          <div className="w-[70%] max-[1100px]:w-full max-[1100px]:pb-8 max-[1100px]:border-b">
            <div className="text-center">
              <h1 className="h3-heading">Tất cả sách</h1>
              <p className="text-lg">
                “ Ngoài con chó, sách là người bạn tốt nhất của con người. Trong
                con chó, quá tối để đọc ” - Groucho Marx
              </p>
            </div>

            <div className="grid grid-cols-3 gap-x-4 mt-8 max-[700px]:grid-cols-1">
              <FormOptimizedSelect
                id="mainCategory"
                label="Danh mục lớn"
                onChange={
                  setSelectedMainCategory as Dispatch<
                    SetStateAction<ISelectOption>
                  >
                }
                options={mainCategories as ISelectOption[]}
                value={selectedMainCategory}
                wrapperCustomClasses="capitalize"
              />

              <FormOptimizedSelect
                id="subCategory"
                label="Danh mục con"
                onChange={
                  setSelectedSubCategory as Dispatch<
                    SetStateAction<ISelectOption>
                  >
                }
                options={subCategories as ISelectOption[]}
                value={selectedSubCategory}
                wrapperCustomClasses="capitalize"
              />

              <FormOptimizedSelect
                id="sortBy"
                label="Sắp xếp theo"
                onChange={setSortBy as Dispatch<SetStateAction<ISelectOption>>}
                options={sortByArray as ISelectOption[]}
                value={sortBy}
              />
            </div>

            <BooksList
              books={books}
              currentPage={currentPage}
              isLoading={isLoading}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
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

export default AllBooksPageContent;
