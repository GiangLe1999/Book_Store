import AllBooksPageContent from "@/components/all-books-page/all-books-page-content";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Tất cả sách",
  description:
    "Tất cả sách trong thư viện sách miễn phí về các thể loại sách kinh tế, chính trị, xã hội và triết học, đang trong quá trình cập nhật. Các bạn quan tâm tới các thể loại sách của thư viện có thể mượn đọc hoặc download bản miễn phí.",
};

interface Props {}

const AllBooksPage: NextPage<Props> = () => {
  return <AllBooksPageContent />;
};

export default AllBooksPage;
