import Breadcrumbs from "@/components/breadcrumbs";
import CategoryPageSidebar from "@/components/category-page/category-page-sidebar";
import { path, websiteName } from "@/constants";
import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const page: NextPage<Props> = () => {
  return (
    <>
      <Breadcrumbs>
        <li>
          <Link
            href={path.copyrights}
            className="hover:underline text-primary font-semibold"
          >
            Bản quyền nội dung
          </Link>
        </li>
      </Breadcrumbs>

      <div className="container">
        <div className="flex gap-12 max-[1100px]:block">
          <div className="prose prose-h2:mt-5 prose-h2:text-lg prose-h2:text-primary w-[70%] max-[1100px]:w-full max-[1100px]:pb-8 max-[1100px]:border-b">
            <h1 className="h3-heading">Bản Quyền Nội Dung</h1>
            <p>
              Toàn bộ Ebook có trên website đều có bản quyền thuộc về tác giả,
              <strong>
                {websiteName} khuyến khích các bạn nếu có khả năng hãy mua sách
                để ủng hộ tác giả.
              </strong>
            </p>

            <p>
              <strong>{websiteName}</strong> là một trang web phi lợi nhuận,
              được hình thành với mục đích tập hợp nhiều sách hay về một thư
              viện, để các bạn đọc không có nhiều điều kiện về tài chính thuận
              lợi trong việc tải và học tập. Ebook được sưu tầm và tổng hợp từ
              các nguồn trên internet ( Google , E-thuvien , Tve-4u, Tinhte,
              Download sách miễn phí, Sách học, Sách vui, Chia sẻ mới,…. ) và
              các dự án ebook của cộng đồng. Chúng tôi chỉ chia sẻ lại cho cộng
              đồng, và không bán những ebook này, toàn bộ ebook có trên web đều
              được chia sẻ miễn phí.
            </p>

            <p>
              Mọi cá nhân hay tổ chức nếu muốn in ấn hay phát hành sách từ Mê
              Tải Sách phải được sự cho phép của tác giả, chúng tôi không khuyến
              khích việc thương mại hóa các ebook này.
            </p>

            <p>
              Vui lòng liên hệ với nhà cung cấp nội dung để xóa nội dung bản
              quyền (nếu có) và gửi email cho chúng tôi, chúng tôi sẽ xóa liên
              kết hoặc nội dung liên quan đến bản quyền ngay lập tức.
            </p>

            <p>
              Mọi kiến nghị về bản quyền liên quan đến Website, vui lòng liên hệ
              với chúng tôi qua Email: <strong>legiangbmt010@gmail.com</strong>
            </p>

            <p>
              <strong>Bản quyền:</strong> “Trang <strong>{websiteName}</strong>{" "}
              không lưu trữ bất kỳ tệp nào trên máy chủ của nó. Chúng tôi chỉ
              lập chỉ mục và liên kết đến nội dung được cung cấp bởi các trang
              web khác. Vui lòng liên hệ với nhà cung cấp nội dung để xóa nội
              dung bản quyền nếu có và gửi email cho chúng tôi, chúng tôi sẽ xóa
              liên kết hoặc nội dung liên quan ngay lập tức.”
            </p>

            <p>
              <strong>Copyright Disclaimer:</strong> “The site{" "}
              <strong>{websiteName}</strong> does not store any files on its
              server. We only index and link to content provided by other sites.
              Please contact the content providers to delete copyright contents
              if any and email us, we’ll remove relevant links or contents
              immediately.”
            </p>
          </div>

          <div className="flex-1 max-[1100px]:mt-8 max-[1100px]:w-1/2 max-[1100px]:mx-auto max-[700px]:w-full">
            <h3 className="h3-heading">Gợi ý cho bạn</h3>
            <CategoryPageSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
