"use client";

import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import BtnWithIcon from "../btn-with-icon";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/navigation";
import FormOptimizedSelect from "../form-optimized-select";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blobToBase64 } from "@/lib/blobToBase64";
import toast from "react-hot-toast";
import { CoreOutput, ISelectOption } from "@/dtos/common.dto";
import axiosInstance from "@/lib/axios";
import FormInput from "../form-input";
import { MdFileUpload } from "react-icons/md";
import NextImage from "../next-image";
import BtnWithLoading from "../btn-with-loading";
import { CreateBookInput } from "@/dtos/book/create-book.dto";
import { getAllMainCategories } from "@/service/main-categories.service";
import { getAllSubCategories } from "@/service/sub-categories.service";
import TextEditor from "../text-editor";
import FormOptimizedCreatableInput from "../optimized-creatable-input";
import { BookEntity } from "@/entities/book.entity";

const schema: any = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên sách"),
  description: Yup.string().required("Vui lòng nhập đoạn mô tả ngắn về sách"),
  slug: Yup.string().required("Vui lòng nhập đường dẫn cho sách"),
  downloadLink: Yup.string().required("Vui lòng nhập link download của sách"),
});

interface FormValues {
  name: string;
  description: string;
  slug: string;
  downloadLink: string;
  file: FileList;
}

interface Props {
  authorId: string | undefined;
  book: BookEntity | undefined;
}

const EditBookForm: FC<Props> = ({ authorId, book }): JSX.Element => {
  const router = useRouter();

  const [cover, setCover] = useState(book?.cover.url || "");
  const [content, setContent] = useState(book?.content || "");
  const [mainCategories, setMainCategories] = useState<ISelectOption[]>();
  const [subCategories, setSubCategories] = useState<ISelectOption[]>();
  const initialTags = useMemo(
    () => book?.tags?.map((tag) => ({ value: tag, label: tag })),
    []
  );
  const [tags, setTags] = useState<ISelectOption[]>(initialTags || []);

  const [selectedMainCategory, setSelectedMainCategory] =
    useState<ISelectOption>({
      value: book?.mainCategory?._id.toString() || "",
      label: book?.mainCategory?.name || "",
    });

  const [selectedSubCategory, setSelectedSubCategory] = useState<ISelectOption>(
    {
      value: book?.subCategory?._id.toString() || "",
      label: book?.subCategory?.name || "",
    }
  );

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      downloadLink: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, setValue } = form;

  const { errors } = formState;

  const uploadCoverHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const base64: any = await blobToBase64(file);
    setCover(base64.toString());
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);

      const { name, description, slug, downloadLink } = formData;

      const bodyRequest: CreateBookInput = {
        name,
        description,
        slug,
        downloadLink,
        content,
        cover,
        mainCategoryId: selectedMainCategory.value,
        subCategoryId: selectedSubCategory.value,
        authorId: authorId as string,
        tags: tags?.map((tag) => tag.value) || [],
      };

      const { data }: { data: CoreOutput } = await axiosInstance.post(
        "/api/admin/book",
        bodyRequest
      );

      if (data.error) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Tạo sách thành công`);
        router.back();
      }
    } catch (error: any) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  const fetchData = async () => {
    Promise.all([
      getAllMainCategories("name"),
      getAllSubCategories("name"),
    ]).then((data) => {
      const formattedMainCategories = data[0]?.map((mainCategory) => ({
        label: mainCategory.name,
        value: mainCategory._id.toString(),
      }));
      setMainCategories(formattedMainCategories as ISelectOption[]);

      const formattedSubCategories = data[1]?.map((subCategory) => ({
        label: subCategory.name,
        value: subCategory._id.toString(),
      }));
      setSubCategories(formattedSubCategories as ISelectOption[]);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setValue("description", book?.description || "");
    setValue("downloadLink", book?.downloadLink || "");
    setValue("name", book?.name || "");
    setValue("slug", book?.slug || "");
  }, []);

  return (
    <>
      <div className="admin-card-body relative !pb-24">
        <div className="text-right mb-6">
          <BtnWithIcon
            content="Trở về trang trước"
            icon={TiArrowBack}
            iconSize={22}
            onClick={() => router.back()}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <div className="flex gap-10 items-center mb-6">
            <label
              htmlFor="cover"
              className="w-[30%] mt-2 relative aspect-[0.66] rounded-md flex flex-col justify-center items-center border border-dashed border-admin_primary cursor-pointer"
            >
              {cover ? (
                <NextImage
                  src={cover}
                  alt="Cover cho sách"
                  className="rounded-md overflow-hidden w-full h-full"
                />
              ) : (
                <>
                  <MdFileUpload size={50} className="text-admin_primary" />
                  <span className="text-admin_primary font-semibold">
                    Chọn ảnh bìa của sách
                  </span>
                  <span className="mt-1 text-slate-700">
                    ( Tỷ lệ ảnh: 0.66 )
                  </span>
                </>
              )}

              <input
                type="file"
                id="cover"
                hidden
                {...register("file", { onChange: uploadCoverHandler })}
              />
            </label>

            <div className="flex-1">
              <FormInput
                id="name"
                label="Tiêu đề"
                register={register("name")}
                errorMsg={errors.name?.message}
                placeholder="Nhập tiêu đề sách"
              />

              <FormInput
                id="slug"
                label="Đường dẫn"
                register={register("slug")}
                errorMsg={errors.slug?.message}
                placeholder="Nhập đường dẫn sách"
              />

              <FormInput
                id="downloadLink"
                label="Link download sách"
                register={register("downloadLink")}
                errorMsg={errors.downloadLink?.message}
                placeholder="Nhập link download sách"
              />

              <FormOptimizedSelect
                id="country"
                label="Chọn danh mục lớn"
                onChange={
                  setSelectedMainCategory as Dispatch<
                    SetStateAction<ISelectOption>
                  >
                }
                options={mainCategories as ISelectOption[]}
                value={selectedMainCategory}
              />

              <FormOptimizedSelect
                wrapperCustomClasses="-mt-2"
                id="SubCategory"
                label="Chọn danh mục con"
                onChange={
                  setSelectedSubCategory as Dispatch<
                    SetStateAction<ISelectOption>
                  >
                }
                options={subCategories as ISelectOption[]}
                value={selectedSubCategory}
              />
            </div>
          </div>

          <FormOptimizedCreatableInput
            wrapperCustomClasses="-mt-2"
            id="SubCategory"
            label="Thêm tags"
            value={tags}
            setValue={setTags}
          />

          <FormInput
            textarea
            id="description"
            rows={4}
            label="Mô tả"
            register={register("description")}
            errorMsg={errors.description?.message}
            placeholder="Nhập description (mô tả) cho sách"
          />

          <label className="form-input-label !mb-1 block">Nội dung sách</label>
          <TextEditor content={content} setContent={setContent} />

          <BtnWithLoading
            content="Tạo sách"
            isLoading={isLoading}
            type="submit"
            customClasses="!absolute bottom-7 right-5"
          />
        </form>
      </div>
    </>
  );
};

export default EditBookForm;
