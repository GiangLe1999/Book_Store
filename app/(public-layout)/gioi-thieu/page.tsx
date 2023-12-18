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
            Giới thiệu
          </Link>
        </li>
      </Breadcrumbs>

      <div className="container">
        <div className="flex gap-12 max-[1100px]:block">
          <div className="prose prose-h2:mt-5 prose-h2:text-lg prose-h2:text-primary w-[70%] max-[1100px]:w-full max-[1100px]:pb-8 max-[1100px]:border-b">
            <h1 className="h3-heading">Giới Thiệu Về {websiteName}</h1>
            <p>{websiteName} - Nơi mở cánh cửa tri thức miễn phí</p>
            <h2>
              1. Sự Ra Đời của Trang Web <strong>{websiteName}</strong>
            </h2>
            <p>
              Trong thời đại số hóa ngày nay, nhu cầu học tập và tiếp cận tri
              thức đã trở nên cực kỳ quan trọng. Nhận thức về điều này đã thúc
              đẩy sự phát triển của nhiều trang web{" "}
              <strong>{websiteName}</strong>, và chúng tôi tự hào giới thiệu một
              không gian trực tuyến nơi mà tri thức là miễn phí và dễ dàng tiếp
              cận.
            </p>
            <h2>2. Thư Viện Đa Dạng và Phong Phú</h2>
            <p>
              <strong>{websiteName}</strong> không chỉ đơn thuần là nơi lưu trữ
              sách, mà còn là một thư viện đa dạng về nội dung. Từ những tác
              phẩm văn học kinh điển cho đến những cuốn sách khoa học, chúng tôi
              đã tổng hợp một bộ sưu tập phong phú để đáp ứng đa dạng nhu cầu
              đọc sách của mọi người. Điều này giúp chúng tôi trở thành một
              nguồn thông tin toàn diện và đáng tin cậy cho cộng đồng yêu sách.
            </p>
            <h2>3. Tiện Ích Tìm Kiếm Nâng Cao</h2>
            <p>
              Để tạo trải nghiệm tìm kiếm thuận lợi,{" "}
              <strong>{websiteName}</strong> đã phát triển công cụ tìm kiếm nâng
              cao, giúp người đọc dễ dàng lọc sách theo thể loại, tác giả, hay
              từ khóa. Điều này giúp tiết kiệm thời gian và nỗ lực, mang lại
              trải nghiệm tìm kiếm sách mượt mà và hiệu quả.
            </p>
            <h2>4. Đóng Góp và Giao Lưu Cộng Đồng</h2>
            <p>
              <strong>{websiteName}</strong> khuyến khích người đọc không chỉ là
              những người tiêu dùng sách mà còn là những người đóng góp vào cộng
              đồng. Trang web không chỉ là nơi tải sách, mà còn là một diễn đàn,
              nơi mọi người có thể chia sẻ ý kiến, đánh giá, và gợi ý sách cho
              nhau. Bằng cách này, <strong>{websiteName}</strong> tạo ra một
              cộng đồng có tinh thần tích cực và sáng tạo.
            </p>
            <h2>5. An Toàn và Bảo Mật</h2>
            <p>
              <strong>{websiteName}</strong> hiểu rằng an toàn và bảo mật là yếu
              tố quan trọng nhất khi người đọc sử dụng{" "}
              <strong>{websiteName}</strong>. Tất cả thông tin cá nhân được bảo
              vệ chặt chẽ, đảm bảo rằng mọi người có thể thoải mái thưởng thức
              sách mà không lo lắng về việc thông tin cá nhân bị đánh cắp.
            </p>
            <h2>6. Hỗ Trợ Đa Thiết Bị</h2>
            <p>
              <strong>{websiteName}</strong> cam kết đảm bảo mọi người trên khắp
              thế giới có thể trải nghiệm trang web một cách thuận lợi nhất.
              <strong>{websiteName}</strong> tương thích trên nhiều thiết bị
              khác nhau, từ máy tính đến điện thoại di động, giúp mọi người đọc
              sách mọi nơi, mọi lúc.
            </p>
            <h2>7. Giá trị mà {websiteName} mang lại</h2>
            <p>
              Trang web tải sách miễn phí của chúng tôi - {websiteName}, không
              chỉ là nơi lưu trữ sách, mà còn là một cộng đồng tri thức sôi nổi.
              Hãy cùng chúng tôi khám phá và chia sẻ niềm đam mê đọc sách, nơi
              mà tri thức được lan truyền và kết nối mọi người trên khắp thế
              giới. Mở cánh cửa tri thức miễn phí và hòa mình vào thế giới của
              những câu chuyện và kiến thức mới lạ!
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
