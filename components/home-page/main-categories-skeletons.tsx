import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMediaQuery } from "react-responsive";

interface Props {}

const MainCategoriesSkeletons: FC<Props> = (props): JSX.Element => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1101px)",
  });
  const level1 = useMediaQuery({ query: "(min-width: 1100px)" });
  const level2 = useMediaQuery({ query: "(min-width: 900px)" });
  const level3 = useMediaQuery({ query: "(min-width: 700px)" });

  return (
    <div className="container mt-10">
      <Skeleton className="w-full h-[30px] mb-4" />

      <div className="grid grid-cols-5 gap-6 max-[1099px]:grid-cols-4 max-[899px]:grid-cols-3 max-[699px]:grid-cols-2">
        {[...Array(level1 ? 5 : level2 ? 4 : level3 ? 3 : 2).keys()].map(
          (item) => (
            <Skeleton key={item} className="w-full aspect-[0.75]" />
          )
        )}
      </div>
    </div>
  );
};

export default MainCategoriesSkeletons;
