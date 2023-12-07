"use client";

import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import BtnWithIcon from "../btn-with-icon";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/navigation";
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
import TextEditor from "../text-editor";
import BtnWithLoading from "../btn-with-loading";
import { CreateArticleInput } from "@/dtos/article/create-article.dto";
import FormOptimizedCreatableInput from "../optimized-creatable-input";
import { ArticleEntity } from "@/entities/article.entity";
import { EditArticleInput } from "@/dtos/article/edit-article.dto";

const schema: any = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên bài viết"),
  description: Yup.string().required("Vui lòng nhập đoạn mô tả bài viết"),
  slug: Yup.string().required("Vui lòng nhập đường dẫn cho bài viết"),
});

interface FormValues {
  name: string;
  description: string;
  slug: string;
}

interface Props {
  authorId: string | undefined;
  article: ArticleEntity | undefined;
}

const EditArticleForm: FC<Props> = ({ authorId, article }): JSX.Element => {
  const router = useRouter();

  const [thumbnail, setThumbnail] = useState(article?.thumbnail?.url || "");
  const [content, setContent] = useState(article?.content || "");
  const initialTags = useMemo(
    () => article?.tags?.map((tag) => ({ value: tag, label: tag })),
    []
  );
  const [tags, setTags] = useState<ISelectOption[]>(initialTags || []);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, setValue } = form;

  const { errors } = formState;

  const uploadThumbnailHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const base64: any = await blobToBase64(file);
    setThumbnail(base64.toString());
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);

      const bodyRequest: EditArticleInput = {
        ...formData,
        content,
        thumbnail,
        tags: tags?.map((tag) => tag.value) || [],
        authorId: authorId as string,
        articleId: article?._id.toString() || "",
      };

      const { data }: { data: CoreOutput } = await axiosInstance.put(
        "/api/admin/article",
        bodyRequest
      );

      if (data.error) {
        setIsLoading(false);
        return toast.error(data.error);
      }

      if (data.ok) {
        setIsLoading(false);
        toast.success(`Cập nhật bài viết thành công`);
        router.back();
      }
    } catch (error: any) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    setValue("description", article?.description || "");
    setValue("name", article?.name || "");
    setValue("slug", article?.slug || "");
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
          <div className="grid grid-cols-2 gap-6 mb-4">
            <label
              htmlFor="thumbnail"
              className="mt-2 relative w-full aspect-[1.78] rounded-md flex flex-col justify-center items-center border border-dashed border-admin_primary cursor-pointer"
            >
              {thumbnail ? (
                <NextImage
                  src={thumbnail}
                  alt="Thumbnail cho bài viết"
                  className="rounded-md overflow-hidden w-full h-full"
                />
              ) : (
                <>
                  <MdFileUpload size={50} className="text-admin_primary" />
                  <span className="text-admin_primary font-semibold">
                    Chọn thumbnail cho bài viết
                  </span>
                  <span className="mt-1 text-slate-700">
                    ( Tỷ lệ ảnh: 16/9 )
                  </span>
                </>
              )}

              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                hidden
                onChange={uploadThumbnailHandler}
              />
            </label>

            <div className="">
              <FormInput
                id="name"
                label="Tiêu đề"
                register={register("name")}
                errorMsg={errors.name?.message}
                placeholder="Nhập tiêu đề bài viết"
              />

              <FormInput
                id="slug"
                label="Đường dẫn"
                register={register("slug")}
                errorMsg={errors.slug?.message}
                placeholder="Nhập đường dẫn bài viết"
              />

              <FormOptimizedCreatableInput
                id="SubCategory"
                label="Thêm tags"
                value={tags}
                setValue={setTags}
              />
            </div>
          </div>

          <FormInput
            textarea
            id="description"
            rows={4}
            label="Mô tả"
            register={register("description")}
            errorMsg={errors.description?.message}
            placeholder="Nhập description (mô tả) cho bài viết"
          />

          <label className="form-input-label !mb-1 block">
            Nội dung bài viết
          </label>
          <TextEditor content={content} setContent={setContent} />

          <BtnWithLoading
            content="Cập nhật bài viết"
            isLoading={isLoading}
            type="submit"
            customClasses="!absolute bottom-7 right-5"
          />
        </form>
      </div>
    </>
  );
};

export default EditArticleForm;
