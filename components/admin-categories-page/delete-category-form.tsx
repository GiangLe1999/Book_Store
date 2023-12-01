"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import BtnWithLoading from "../btn-with-loading";
import axiosInstance from "@/lib/axios";
import { CoreOutput } from "@/dtos/common.dto";
import toast from "react-hot-toast";
import { MainCategoryEntity } from "@/entities/main-category.entity";
import { SubCategoryEntity } from "@/entities/sub-category.entity";

interface Props {
  setShowDeleteForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  deletedCategory: MainCategoryEntity | SubCategoryEntity | undefined;
  isMainCategory?: boolean;
  isSubCategory?: boolean;
}

const DeleteCategoryForm: FC<Props> = ({
  setShowDeleteForm,
  refetch,
  deletedCategory,
  isMainCategory,
  isSubCategory,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteCategoryHandler = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: CoreOutput } = await axiosInstance.delete(
        `/api/admin/${isMainCategory ? "main" : "sub"}-category?id=${
          deletedCategory?._id
        }`
      );

      if (data.error) {
        toast.error(data.error);
        return setIsLoading(false);
      }

      if (data.ok) {
        toast.success(`Xóa danh mục ${deletedCategory?.name} thành công`);
        setShowDeleteForm(false);
        setIsLoading(false);
        refetch();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="admin-card-body">
      <p className="font-bold text-xl text-center mt-2 mb-3">
        Bạn chắc chắn muốn xóa danh mục {deletedCategory?.name}?
      </p>
      <p className="text-center">
        Sau khi xóa tất cả sách thuộc danh mục {deletedCategory?.name} vẫn giữ
        nguyên
      </p>

      <div className="text-center mt-4">
        <BtnWithLoading
          content="Xác nhận xóa"
          isLoading={isLoading}
          type="submit"
          onClick={deleteCategoryHandler}
        />
      </div>
    </div>
  );
};

export default DeleteCategoryForm;
