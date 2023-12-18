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
            href={path.privacy}
            className="hover:underline text-primary font-semibold"
          >
            Chính sách bảo mật
          </Link>
        </li>
      </Breadcrumbs>

      <div className="container">
        <div className="flex gap-12 max-[1100px]:block">
          <div className="prose prose-h2:mt-5 prose-h2:text-lg prose-h2:text-primary w-[70%] max-[1100px]:w-full max-[1100px]:pb-8 max-[1100px]:border-b">
            <h1 className="h3-heading">Chính Sách Bảo Mật</h1>
            <p>
              <strong>{websiteName}</strong> cam kết sẽ bảo mật những thông tin
              mang tính riêng tư của khách hàng. Quý khách vui lòng đọc bản
              “Chính sách bảo mật” dưới đây để hiểu hơn những cam kết mà chúng
              tôi thực hiện, nhằm tôn trọng và bảo vệ quyền lợi của người truy
              cập:
            </p>

            <h2>1. Thu Thập Thông Tin Cá Nhân</h2>
            <p>
              Các thông tin thu thập thông qua website{" "}
              <strong>{websiteName}</strong> sẽ giúp chúng tôi:
            </p>
            <ul>
              <li>Giải đáp thắc mắc người dùng.</li>
              <li>
                Cung cấp cho bạn thông tin mới nhất trên Website của chúng tôi.
              </li>
              <li>Xem xét và nâng cấp nội dung và giao diện của Website.</li>
              <li>Thực hiện các bản khảo sát khách hàng.</li>
              <li>
                Thực hiện các hoạt động quảng bá liên quan đến các sản phẩm và
                dịch vụ của <strong>{websiteName}</strong>.
              </li>
              <li> Giải đáp thắc mắc người dùng.</li>
            </ul>

            <p>
              Để truy cập và sử dụng một số dịch vụ tại{" "}
              <strong>{websiteName}</strong>, quý khách có thể sẽ được yêu cầu
              đăng ký với chúng tôi thông tin cá nhân (Email, Họ tên…). Mọi
              thông tin khai báo phải đảm bảo tính chính xác và hợp pháp.{" "}
              <strong>{websiteName}</strong> không chịu mọi trách nhiệm liên
              quan đến pháp luật của thông tin khai báo.
            </p>

            <p>
              Chúng tôi cũng có thể thu thập thông tin về số lần viếng thăm, bao
              gồm số trang quý khách xem, số links (liên kết) bạn click và những
              thông tin khác liên quan đến việc kết nối đến{" "}
              <strong>{websiteName}</strong>. Chúng tôi cũng thu thập các thông
              tin mà trình duyệt Web (Browser) quý khách sử dụng mỗi khi truy
              cập vào website <strong>{websiteName}</strong>, bao gồm: địa chỉ
              IP, loại Browser, ngôn ngữ sử dụng, thời gian và những địa chỉ mà
              Browser truy xuất đến.
            </p>

            <h2>2. Sử Dụng Thông Tin Cá Nhân</h2>
            <p>
              <strong>{websiteName}</strong> thu thập và sử dụng thông tin cá
              nhân quý khách với mục đích phù hợp và hoàn toàn tuân thủ nội dung
              của “Chính sách bảo mật” này.
            </p>

            <p>
              Khi cần thiết, chúng tôi có thể sử dụng những thông tin này để
              liên hệ trực tiếp với bạn dưới các hình thức như: gởi thư ngỏ, đơn
              đặt hàng, thư cảm ơn, thông tin về kỹ thuật và bảo mật, quý khách
              có thể nhận được thư định kỳ cung cấp thông tin sản phẩm, dịch vụ
              mới, thông tin về các sự kiện sắp tới hoặc thông tin tuyển dụng
              nếu quý khách đăng kí nhận email thông báo.
            </p>

            <h2>3. Chia Sẻ Thông Tin Cá Nhân</h2>
            <ul>
              <li>
                Ngoại trừ các trường hợp về Sử dụng thông tin cá nhân như đã nêu
                trong chính sách này, chúng tôi cam kết sẽ không tiết lộ thông
                tin cá nhân bạn ra ngoài.
              </li>
              <li>
                Trong một số trường hợp, chúng tôi có thể thuê một đơn vị độc
                lập để tiến hành các dự án nghiên cứu thị trường và khi đó thông
                tin của bạn sẽ được cung cấp cho đơn vị này để tiến hành dự án.
                Bên thứ ba này sẽ bị ràng buộc bởi một thỏa thuận về bảo mật mà
                theo đó họ chỉ được phép sử dụng những thông tin được cung cấp
                cho mục đích hoàn thành dự án.
              </li>
              <li>
                Chúng tôi có thể tiết lộ hoặc cung cấp thông tin cá nhân của bạn
                trong các trường hợp thật sự cần thiết như sau:
                <ul className="list-none">
                  <li>(a) Khi có yêu cầu của các cơ quan pháp luật;</li>
                  <li>
                    (b) Trong trường hợp mà chúng tôi tin rằng điều đó sẽ giúp
                    chúng tôi bảo vệ quyền lợi chính đáng của mình trước pháp
                    luật;
                  </li>
                  <li>
                    (c) Tình huống khẩn cấp và cần thiết để bảo vệ quyền an toàn
                    cá nhân của các thành viên {websiteName} khác.
                  </li>
                </ul>
              </li>
            </ul>

            <h2>4. Truy Xuất Thông Tin Cá Nhân</h2>
            <p>
              Bất cứ thời điểm nào quý khách cũng có thể truy cập và chỉnh sửa
              những thông tin cá nhân của mình theo các liên kết (website’s
              links) thích hợp mà chúng tôi cung cấp.
            </p>

            <h2>5. Bảo Mật Thông Tin Cá Nhân</h2>
            <p>
              Khi bạn gửi thông tin cá nhân của bạn cho chúng tôi, bạn đã đồng ý
              với các điều khoản mà chúng tôi đã nêu ở trên,{" "}
              <strong>{websiteName}</strong> cam kết bảo mật thông tin cá nhân
              của quý khách bằng mọi cách thức có thể. Chúng tôi sẽ sử dụng
              nhiều công nghệ bảo mật thông tin khác nhau như: chuẩn quốc tế
              PCI, SSL,… nhằm bảo vệ thông tin này không bị truy lục, sử dụng
              hoặc tiết lộ ngoài ý muốn.
            </p>

            <p>
              Tuy nhiên do hạn chế về mặt kỹ thuật, không một dữ liệu nào có thể
              được truyền trên đường truyền internet mà có thể được bảo mật
              100%. Do vậy, chúng tôi không thể đưa ra một cam kết chắc chắn
              rằng thông tin quý khách cung cấp cho chúng tôi sẽ được bảo mật
              một cách tuyệt đối an toàn, và chúng tôi không thể chịu trách
              nhiệm trong trường hợp có sự truy cập trái phép thông tin cá nhân
              của quý khách như các trường hợp quý khách tự ý chia sẻ thông tin
              với người khác…. Nếu quý khách không đồng ý với các điều khoản như
              đã mô tả ở trên, Chúng tôi khuyên quý khách không nên gửi thông
              tin đến cho chúng tôi.
            </p>

            <p>
              Vì vậy, <strong>{websiteName}</strong> cũng khuyến cáo quý khách
              nên bảo mật các thông tin liên quan đến mật khẩu truy xuất của quý
              khách và không nên chia sẻ với bất kỳ người nào khác.
            </p>

            <p>
              Nếu sử dụng máy tính chung nhiều người, quý khách nên đăng xuất,
              hoặc thoát hết tất cả cửa sổ Website đang mở.
            </p>

            <h2>6. Sử Dụng “Cookie”</h2>
            <p>
              <strong>{websiteName}</strong> có thể dùng “Cookie” để giúp cá
              nhân hóa và nâng cao tối đa hiệu quả sử dụng thời gian trực tuyến
              của quý khách.
            </p>

            <p>
              Một cookie là một file văn bản được đặt trên đĩa cứng của bạn bởi
              một máy chủ của trang web. Cookie không được dùng để chạy chương
              trình hay đưa virus vào máy tính của quý khách. Cookie được chỉ
              định vào máy tính của quý khách và chỉ có thể được đọc bởi một máy
              chủ trang web trên miền được đưa ra cookie cho quý khách.
            </p>

            <p>
              Một trong những mục đích của Cookie là cung cấp những tiện ích để
              tiết kiệm thời gian của quý khách khi truy cập tại website Mê Tải
              Sách hoặc viếng thăm website <strong>{websiteName}</strong> lần
              nữa mà không cần đăng ký lại thông tin sẵn có.
            </p>

            <p>
              Quý khách có thể chấp nhận hoặc từ chối dùng cookie. Hầu hết những
              Browser tự động chấp nhận cookie, nhưng quý khách có thể thay đổi
              những cài đặt để từ chối tất cả những cookie nếu quý khách thích.
              Tuy nhiên, nếu quý khách chọn từ chối cookie, điều đó có thể gây
              cản trở và ảnh hưởng không tốt đến một số dịch vụ và tính năng phụ
              thuộc vào cookie tại website <strong>{websiteName}</strong>.
            </p>

            <h2>7. Quy Định Về “Spam”</h2>
            <p>
              <strong>{websiteName}</strong> thực sự quan ngại đến vấn nạn Spam
              (thư rác), các Email giả mạo danh tín chúng tôi gởi đi. Do đó,{" "}
              <strong>{websiteName}</strong> khẳng định chỉ gởi Email đến quý
              khách khi và chỉ khi quý khách có đăng ký hoặc sử dụng dịch vụ từ
              hệ thống của chúng tôi.
            </p>

            <p>
              <strong>{websiteName}</strong> cam kết không bán, thuê lại hoặc
              cho thuê email của quý khách từ bên thứ ba. Nếu quý khách vô tình
              nhận được Email không theo yêu cầu từ hệ thống chúng tôi do một
              nguyên nhân ngoài ý muốn, xin vui lòng nhấn vào link từ chối nhận
              Email này kèm theo, hoặc thông báo trực tiếp đến ban quản trị
              Website.
            </p>

            <h2>8. Thay Đổi Về Chính Sách</h2>
            <p>
              Chúng tôi hoàn toàn có thể thay đổi nội dung trong trang này mà
              không cần phải thông báo trước, để phù hợp với các nhu cầu của Mê
              Tải Sách cũng như nhu cầu và sự phản hồi từ khách hàng nếu có. Khi
              cập nhật nội dung chính sách này, chúng tôi sẽ chỉnh sửa lại thời
              gian “Cập nhật lần cuối” bên dưới.
            </p>

            <p>
              Nội dung “Chính sách bảo mật” này chỉ áp dụng tại{" "}
              <strong>{websiteName}</strong> , không bao gồm hoặc liên quan đến
              các bên thứ ba đặt quảng cáo hay có links tại{" "}
              <strong>{websiteName}</strong>. Chúng tôi khuyến khích bạn đọc kỹ
              chính sách An toàn và Bảo mật của các trang web của bên thứ ba
              trước khi cung cấp thông tin cá nhân cho các trang web đó. Chúng
              tôi không chịu trách nhiệm dưới bất kỳ hình thức nào về nội dung
              và tính pháp lý của trang web thuộc bên thứ ba.
            </p>

            <p>
              Vì vậy, bạn đã đồng ý rằng, khi bạn sử dụng website của chúng tôi
              sau khi chỉnh sửa nghĩa là bạn đã thừa nhận, đồng ý tuân thủ cũng
              như tin tưởng vào sự chỉnh sửa này. Do đó, chúng tôi đề nghị bạn
              nên xem trước nội dung trang này trước khi truy cập các nội dung
              khác trên website cũng như bạn nên đọc và tham khảo kỹ nội dung
              “Chính sách bảo mật” của từng website mà bạn đang truy cập.
            </p>

            <h2>9. Thông Tin Liên Hệ</h2>
            <p>
              Chúng tôi luôn hoan nghênh các ý kiến đóng góp, liên hệ và phản
              hồi thông tin từ bạn về “Chính sách bảo mật” này. Nếu bạn có những
              thắc mắc liên quan xin vui lòng liên hệ theo địa chỉ Email:
              <strong>legiangbmt010@gmail.com</strong>.
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
