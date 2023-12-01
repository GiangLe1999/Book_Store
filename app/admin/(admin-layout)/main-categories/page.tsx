import AdminCardTitle from "@/components/admin-card-title";
import CategoriesTable from "@/components/admin-categories-page/categories-table";
import { NextPage } from "next";
import { MdCategory } from "react-icons/md";

interface Props {}

const AdminCategoriesPage: NextPage<Props> = async () => {
  return (
    <div className="admin-page-container">
      <div className="admin-card">
        <AdminCardTitle
          cardTitle="Danh mục lớn"
          cardIconClasses="admin-main-gradient"
          icon={MdCategory}
          iconSize={22}
        />
        <CategoriesTable isMainCategories />
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
