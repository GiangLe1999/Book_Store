import EditBookForm from "@/components/admin-books-page/edit-book-form";
import AdminCardTitle from "@/components/admin-card-title";
import { getBookBySlug } from "@/service/books.service";
import { authOptions } from "@/utils/authOptions";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { MdEditSquare } from "react-icons/md";

interface Props {
  searchParams: { slug: string };
}

const Page: NextPage<Props> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const book = await getBookBySlug(searchParams.slug);

  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Cập nhật thông tin sách"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />

        <EditBookForm authorId={session?.user._id.toString()} book={book} />
      </div>
    </div>
  );
};

export default Page;
