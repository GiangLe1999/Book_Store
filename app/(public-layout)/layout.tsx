import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout: FC<Props> = ({ children }): JSX.Element => {
  return <>{children}</>;
};

export default layout;
