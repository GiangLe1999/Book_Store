import AuthorPageContent from "@/components/author-page/author-page-content";
import { getSameAuthorBooks } from "@/service/books.service";
import { NextPage } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const data = await getSameAuthorBooks(params.slug, 1, 1);

    return {
      title: `Tác giả ${data?.books?.[0].realAuthor}`,
      description: `Đón đọc hoặc tải miễn phí bản PDF của những quyển sách mới nhất, chất lượng nhất được chắp bút bởi tác giả ${data?.books?.[0].publisher}`,
    };
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  params: { slug: string };
}

const PulisherPage: NextPage<Props> = ({ params }) => {
  return <AuthorPageContent params={params} />;
};

export default PulisherPage;
