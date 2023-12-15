import { FC } from "react";
import FacebookFanpage from "../facebook-fanpage";
import RecommendBooksTabs from "../recommend-books-tabs";

interface Props {}

const CategoryPageSidebar: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <RecommendBooksTabs />
      <div className="mt-10">
        <FacebookFanpage />
      </div>
    </div>
  );
};

export default CategoryPageSidebar;
