import AllTagsPageContent from "@/components/all-tags-page/all-tags-page-content";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Tất cả thẻ",
  description:
    "Tất cả thẻ phân loại trong thư viện sách miễn phí về các thể loại sách kinh tế, chính trị, xã hội và triết học, đang trong quá trình cập nhật. Các bạn quan tâm tới các thể loại sách của thư viện có thể mượn đọc hoặc download bản miễn phí.",
};

interface Props {}

const AllTagsPage: NextPage<Props> = () => {
  return <AllTagsPageContent />;
};

export default AllTagsPage;
