import CreateBookForm from "@/components/admin-books-page/create-book-form";
import AdminCardTitle from "@/components/admin-card-title";
import { authOptions } from "@/utils/authOptions";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { MdCreateNewFolder } from "react-icons/md";

interface Props {}

const Page: NextPage<Props> = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Tạo sách mới"
          cardIconClasses="admin-main-gradient"
          icon={MdCreateNewFolder}
          iconSize={22}
        />

        <CreateBookForm authorId={session?.user._id.toString()} />
      </div>
    </div>
  );
};

export default Page;
