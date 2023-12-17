import SearchPageContent from "@/components/search-page/search-page-content";
import { NextPage } from "next";

export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  try {
    const query = searchParams["tu-khoa"];

    return {
      title: `Kết quả tìm kiếm cho ${params}`,
      description: `Kết quả tìm kiếm cho những sách tại website Kho Sách 247 có tiêu đề khớp với từ khóa ${query}`,
    };
  } catch (error) {
    console.log(error);
  }
};

interface Props {}

const page: NextPage<Props> = () => {
  return <SearchPageContent />;
};

export default page;
