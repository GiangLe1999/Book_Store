import { FC } from "react";

interface Props {}

const RootSidebar: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <ul></ul>
      <div className="my-5 py-3 px-4"></div>
    </div>
  );
};

export default RootSidebar;
