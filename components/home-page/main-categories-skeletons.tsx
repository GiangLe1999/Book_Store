import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {}

const MainCategoriesSkeletons: FC<Props> = (props): JSX.Element => {
  return (
    <div className="container mt-10">
      <div className="grid grid-cols-5 gap-6 mb-4">
        <Skeleton className="w-full h-[30px]" />
        <Skeleton className="h-0" />
        <Skeleton className="h-0" />
        <Skeleton className="h-0" />
        <Skeleton className="w-full h-[30px]" />
      </div>
      <div className="grid grid-cols-5 gap-6">
        {[...Array(5).keys()].map((item) => (
          <Skeleton key={item} className="w-full aspect-[0.75]" />
        ))}
      </div>
    </div>
  );
};

export default MainCategoriesSkeletons;
