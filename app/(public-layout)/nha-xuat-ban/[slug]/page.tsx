import PublisherPageContent from "@/components/publisher-page/publisher-page-content";
import { getSamePublisherBooks } from "@/service/books.service";
import { NextPage } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const data = await getSamePublisherBooks(params.slug, 1, 1);

    return {
      title: data?.books?.[0].publisher,
      description: `Đón đọc hoặc tải miễn phí bản PDF của những quyển sách mới nhất, chất lượng nhất từ ${data?.books?.[0].publisher}`,
    };
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  params: { slug: string };
}

const PulisherPage: NextPage<Props> = ({ params }) => {
  return <PublisherPageContent params={params} />;
};

export default PulisherPage;
