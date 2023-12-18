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
            href={path.procedure}
            className="hover:underline text-primary font-semibold"
          >
            Quy định sử dụng
          </Link>
        </li>
      </Breadcrumbs>

      <div className="container">
        <div className="flex gap-12 max-[1100px]:block">
          <div className="prose prose-h2:mt-5 prose-h2:text-lg prose-h2:text-primary w-[70%] max-[1100px]:w-full max-[1100px]:pb-8 max-[1100px]:border-b">
            <h1 className="h3-heading">Quy Định Sử Dụng</h1>
            <p>
              Khi truy cập, sử dụng nội dung các bài viết, bình luận, liên hệ,
              yêu cầu hỗ trợ trên Website <strong>{websiteName}</strong>, các
              bạn vui lòng tuân thủ các quy định sau đây:
            </p>
            <h2>A. QUY ĐỊNH VỀ BÌNH LUẬN</h2>
            <ul>
              <li>
                Vui lòng bình luận bằng tiếng Việt có dấu. Mọi bình luận bằng
                tiếng Việt không có dấu (nếu không có lý do chính đáng) sẽ bị
                xóa bỏ.
              </li>
              <li>
                Không chèn link không liên quan vào trong nội dung bình luận.
              </li>
              <li>
                Không sử dụng các từ ngữ thô tục, phản cảm, trái với thuần phong
                mĩ tục và vi phạm các quy định của pháp luật.
              </li>
              <li>Hãy thể hiện mình là người có văn hóa.</li>
              <li>
                Tất cả các bình luận đăng tải sẽ được kiểm duyệt nghiêm ngặt.
                Vui lòng tuân thủ các quy định trên để tránh các vấn đề đáng
                tiếc xảy ra.
              </li>
            </ul>

            <h2>B. QUY ĐỊNH VỀ LIÊN HỆ</h2>
            <p>
              Mọi thắc mắc về bài viết, ebook, sách … Các bạn vui lòng gửi vào
              khung bình luận bên dưới các bài viết có liên quan để được giải
              đáp. Tôi có quyền không trả lời những email, tin nhắn thể hiện sự
              thiếu tôn trọng đối với {websiteName}.
            </p>

            <h2>C. QUYỀN SỬ DỤNG TÀI NGUYÊN</h2>
            <ol>
              <li>
                Bản quyền mọi sách, ebooks được đăng tải trên {websiteName} đều
                thuộc về tác giả
              </li>
              <li>
                Bạn không được phép sử dụng nội dung trên {websiteName} vào mục
                đích thương mại như in ấn, lưu hành cho khách hàng.
              </li>
              <li>
                Bạn được phép sử dụng lại các tài nguyên trên Website: Sách,
                ebooks, bài viết. Tuy nhiên, chúng tôi khuyến khích việc sử dụng
                này cùng với việc trích dẫn nguồn cũng như giữ nguyên đường liên
                kết (link/url) đến địa chỉ tài nguyên gốc trên {websiteName}.
              </li>
            </ol>

            <h2>D. LIÊN KẾT NGOÀI</h2>
            <p>
              {websiteName} chia sẻ ebook, sách điện tử thông qua liên kết/đường
              link/url tới một hoặc nhiều trang web khác không thuộc kiểm soát
              hoặc sở hữu của chúng tôi. Việc truy cập tới các trang khác này
              hoàn toàn có thể gặp rủi ro, nguy hiểm. Trong mọi trường hợp chúng
              tôi không chịu bất kỳ trách nhiệm nào về nội dung của bất kỳ trang
              web nào được liên kết từ bên ngoài. Người sử dụng (độc giả) truy
              cập và sử dụng những liên kết này và tự chịu trách nhiệm về các
              rủi ro và {websiteName} không chịu trách nhiệm về bất kỳ thiệt hại
              hoặc mất mát nào mà độc giả phải gánh chịu phát sinh từ hoặc liên
              quan đến việc sử dụng liên kết này.
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
