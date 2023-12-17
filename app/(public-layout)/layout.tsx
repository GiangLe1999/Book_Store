import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import MobileHeader from "@/components/layout/mobile-header";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      <MobileHeader />
      <main className="mt-[130px] max-[1250px]:mt-[85px]">{children}</main>
      <Footer />
    </>
  );
};

export default layout;
