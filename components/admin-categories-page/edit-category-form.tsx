import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnWithLoading from "@/components/btn-with-loading";
import FormInput from "../form-input";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { CreateAccountOutput } from "@/dtos/auth/create-account.dto";
import { MainCategoryEntity } from "@/entities/main-category.entity";
import { SubCategoryEntity } from "@/entities/sub-category.entity";
import { CreateMainCategoryInput } from "@/dtos/main-category/create-main-category.dto";
import FormOptimizedSelect from "../form-optimized-select";
import { getAllMainCategories } from "@/service/main-categories.service";
import { CreateSubCategoryInput } from "@/dtos/sub-category/create-sub-category.dto";
import { ISelectOption } from "@/dtos/common.dto";

interface Props {
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  editedCategory: MainCategoryEntity | SubCategoryEntity | undefined;
  isMainCategory?: boolean;
  isSubCategory?: boolean;
}

const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên danh mục"),
  slug: Yup.string().required("Vui lòng nhập đường dẫn danh mục"),
  description: Yup.string().required("Vui lòng nhập mô tả danh mục"),
});

interface Props {
  refetch: () => void;
}

interface FormValues {
  name: string;
  slug: string;
  description: string;
}

const EditCategoryForm: FC<Props> = ({
  setShowEditForm,
  refetch,
  editedCategory,
  isMainCategory,
  isSubCategory,
}): JSX.Element => {
  const [categories, setCategories] = useState<ISelectOption[]>();
  const [selectedCategory, setSelectedCategory] = useState<ISelectOption>({
    value: "",
    label: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      slug: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, setValue } = form;

  const { errors } = formState;

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);

      let bodyRequest;
      if (isMainCategory) {
        bodyRequest = formData as CreateMainCategoryInput;
      } else {
        bodyRequest = {
          ...formData,
          mainCategory: selectedCategory.value,
        } as CreateSubCategoryInput;
      }

      const { data }: { data: CreateAccountOutput } = await axiosInstance.put(
        `/api/admin/${isMainCategory ? "main" : "sub"}-category?id=${
          editedCategory?._id
        }`,
        bodyRequest
      );

      if (data.error) {
        setIsLoading(false);
        toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Cập nhật danh mục ${formData.name} thành công`);
        setShowEditForm(false);
        refetch();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setValue("name", editedCategory?.name || "");
    setValue("slug", editedCategory?.slug || "");
    setValue("description", editedCategory?.description || "");
    if (isSubCategory) {
      setSelectedCategory({
        value: (editedCategory as SubCategoryEntity)?.mainCategory?._id || "",
        label: (editedCategory as SubCategoryEntity)?.mainCategory?.name || "",
      });
    }
  }, []);

  useEffect(() => {
    if (isSubCategory) {
      getAllMainCategories("name")
        .then((data) => {
          const formattedCategories = data?.map((category) => ({
            label: category.name,
            value: category._id,
          }));

          setCategories(formattedCategories);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-card-body">
      <FormInput
        id="name"
        label="Tên danh mục"
        register={register("name")}
        errorMsg={errors.name?.message}
        placeholder={
          isMainCategory
            ? "Eg: Lớp học, Ôn thi đại học, ..."
            : "Eg: Lớp 1, Lớp 2, Toán học, ..."
        }
      />
      <FormInput
        id="slug"
        label="Đường dẫn của danh mục"
        register={register("slug")}
        errorMsg={errors.slug?.message}
        placeholder={
          isMainCategory
            ? "Eg: lop-hoc, on-thi-dai-hoc ..."
            : "Eg: lop-1, lop-2, toan-hoc ..."
        }
      />

      {isSubCategory && (
        <FormOptimizedSelect
          id="category"
          label="Chọn danh mục cha"
          onChange={
            setSelectedCategory as Dispatch<SetStateAction<ISelectOption>>
          }
          options={categories as ISelectOption[]}
          value={selectedCategory}
        />
      )}

      <FormInput
        id="description"
        textarea
        rows={3}
        label="Mô tả danh mục"
        register={register("description")}
        errorMsg={errors.description?.message}
      />

      <div className="text-right">
        <BtnWithLoading
          content="Xác nhận"
          isLoading={isLoading}
          type="submit"
        />
      </div>
    </form>
  );
};

export default EditCategoryForm;
