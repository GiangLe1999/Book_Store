import TagPageContent from "@/components/tag-page/tag-page-content";
import { getSameTagBooks } from "@/service/books.service";
import { NextPage } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const data = await getSameTagBooks(params.slug, 1, 1);

    return {
      title: `Thẻ ${data?.tagName}`,
      description: `Đón đọc hoặc tải miễn phí bản PDF của những quyển sách mới nhất, chất lượng nhất thuộc thẻ ${data?.tagName}`,
    };
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  params: { slug: string };
}

const TagPage: NextPage<Props> = ({ params }) => {
  return <TagPageContent params={params} />;
};

export default TagPage;
