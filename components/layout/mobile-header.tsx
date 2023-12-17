"use client";

import { FC, useState } from "react";
import { HiMenu, HiSearch } from "react-icons/hi";
import Logo from "../logo";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import RootSidebar from "./root-sidebar";

interface Props {}

const MobileHeader: FC<Props> = (props): JSX.Element => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 max-[1250px]:block hidden border-b">
        <div className="main-gradient py-3">
          <div className="container flex items-center justify-between">
            <button className="text-white" onClick={() => setShowSidebar(true)}>
              <HiMenu size={30} />
            </button>

            <Logo wrapperClasses="w-[200px] h-[30px]" textWhite />

            <button className="text-white">
              <HiSearch size={30} />
            </button>
          </div>
        </div>
      </header>
      <Modal
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        classNames={{
          modalContainer: "root-sidebar",
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOut: "customLeaveOverlayAnimation",
          modalAnimationIn: "customRootSidebarEnter",
          modalAnimationOut: "customRootSidebarLeave",
        }}
      >
        <RootSidebar />
      </Modal>
    </>
  );
};

export default MobileHeader;
