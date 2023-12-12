import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      <main className="mt-[130px]">{children}</main>
      <Footer />
    </>
  );
};

export default layout;
