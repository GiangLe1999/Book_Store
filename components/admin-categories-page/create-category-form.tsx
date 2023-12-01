import { Dispatch, FC, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnWithLoading from "@/components/btn-with-loading";
import FormInput from "../form-input";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { CreateAccountOutput } from "@/dtos/auth/create-account.dto";
import { CreateCategoryInput } from "@/dtos/main-category/create-category.dto";

interface Props {
  setShowCreateForm: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  isMainCategory?: boolean;
  isSubCategory?: boolean;
}

const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên danh mục"),
  slug: Yup.string().required("Vui lòng nhập đường dẫn danh mục"),
  description: Yup.string().required("Vui lòng nhập mô tả danh mục"),
});

interface FormValues {
  name: string;
  slug: string;
  description: string;
}

const CreateCategoryForm: FC<Props> = ({
  setShowCreateForm,
  refetch,
  isMainCategory,
  isSubCategory,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);

      const requestBody: CreateCategoryInput = { ...formData };

      if (isMainCategory) {
      }
      const { data }: { data: CreateAccountOutput } = await axiosInstance.post(
        `/api/admin/${isMainCategory ? "main" : "sub"}-category`,
        requestBody
      );

      if (data.error) {
        setIsLoading(false);
        toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Tạo danh mục ${formData.name} thành công`);
        setShowCreateForm(false);
        refetch();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
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

export default CreateCategoryForm;
