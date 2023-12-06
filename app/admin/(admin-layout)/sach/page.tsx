import BooksTable from "@/components/admin-books-page/books-table";
import AdminCardTitle from "@/components/admin-card-title";
import { NextPage } from "next";
import { MdEditSquare } from "react-icons/md";

interface Props {}

const Page: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Sách"
          cardIconClasses="admin-main-gradient"
          icon={MdEditSquare}
          iconSize={22}
        />

        <BooksTable />
      </div>
    </div>
  );
};

export default Page;
