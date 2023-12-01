"use client";

import { FC, useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { BiPlusCircle } from "react-icons/bi";
import CreateCategoryForm from "./create-category-form";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiFillDelete } from "react-icons/ai";
import EditCategoryForm from "./edit-category-form";
import DeleteCategoryForm from "./delete-category-form";
import { getAllMainCategories } from "@/service/main-categories.service";
import { getAllSubCategories } from "@/service/sub-categories.service";
import { MainCategoryEntity } from "@/entities/main-category.entity";
import { SubCategoryEntity } from "@/entities/sub-category.entity";
import BtnWithIcon from "../btn-with-icon";
import CustomModal from "../custom-model";

interface Props {
  isMainCategories?: boolean;
  isSubCategories?: boolean;
}

const CategoriesTable: FC<Props> = ({
  isMainCategories,
  isSubCategories,
}): JSX.Element => {
  const [categories, setCategories] = useState<
    MainCategoryEntity[] | SubCategoryEntity[]
  >([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedCategory, setEditCategory] = useState<
    MainCategoryEntity | SubCategoryEntity
  >();
  const [deletedCategory, setDeletedCategory] = useState<
    MainCategoryEntity | SubCategoryEntity
  >();

  const fetchCategories = async () => {
    setIsLoading(true);
    const fetchedCategories = isMainCategories
      ? await getAllMainCategories("name slug books")
      : await getAllSubCategories("name slug books");

    if (isMainCategories) {
      setCategories(fetchedCategories as MainCategoryEntity[]);
    } else {
      setCategories(fetchedCategories as SubCategoryEntity[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm danh mục"
            icon={BiPlusCircle}
            iconSize={18}
            onClick={() => setShowCreateForm(true)}
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Đường dẫn (Slug)</th>
              <th>Số lượng sách</th>
              <th>Sửa / Xóa</th>
            </tr>
          </thead>

          {isLoading ? (
            <>
              {[...Array(6).keys()].map((item) => (
                <tr key={item} className="mb-3">
                  <td colSpan={5}>
                    <Skeleton className="w-full h-10" />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tbody>
              {categories.map((category) => (
                <tr key={category._id.toString()}>
                  <td className="text-center">{category.name}</td>
                  <td className="text-center">{category.slug}</td>
                  <td className="text-center">{category.books.length}</td>
                  <td className="flex items-center justify-center gap-4">
                    <MdEditSquare
                      className="mt-1 cursor-pointer text-blue-900"
                      size={18}
                      onClick={() => {
                        setShowEditForm(true);
                        setEditCategory(category);
                      }}
                    />
                    <AiFillDelete
                      className="mt-1 cursor-pointer text-red-700"
                      size={18}
                      onClick={() => {
                        setShowDeleteForm(true);
                        setDeletedCategory(category);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <CustomModal
        heading="Tạo danh mục mới"
        onClose={() => setShowCreateForm(false)}
        open={showCreateForm}
      >
        <CreateCategoryForm
          setShowCreateForm={setShowCreateForm}
          refetch={fetchCategories}
          isMainCategory={isMainCategories}
          isSubCategory={isSubCategories}
        />
      </CustomModal>

      <CustomModal
        heading="Sửa danh mục"
        onClose={() => setShowEditForm(false)}
        open={showEditForm}
      >
        <EditCategoryForm
          setShowEditForm={setShowEditForm}
          refetch={fetchCategories}
          editedCategory={editedCategory}
          isMainCategory={isMainCategories}
          isSubCategory={isSubCategories}
        />
      </CustomModal>

      <CustomModal
        heading="Cảnh báo"
        onClose={() => setShowDeleteForm(false)}
        open={showDeleteForm}
      >
        <DeleteCategoryForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchCategories}
          deletedCategory={deletedCategory}
          isMainCategory={isMainCategories}
          isSubCategory={isSubCategories}
        />
      </CustomModal>
    </>
  );
};

export default CategoriesTable;
