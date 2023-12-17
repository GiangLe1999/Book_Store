"use client";

import { FC, useEffect, useRef, useState } from "react";
import { HiMenu, HiSearch } from "react-icons/hi";
import Logo from "../logo";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import RootSidebar from "./root-sidebar";
import { usePathname } from "next/navigation";
import SearchBar from "./search-bar";

interface Props {}

const MobileHeader: FC<Props> = (props): JSX.Element => {
  const [showSidebar, setShowSidebar] = useState(false);
  const modalRef = useRef(null);
  const pathName = usePathname();
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    setShowSidebar(false);
  }, [pathName]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 max-[1250px]:block hidden border-b">
        <div className="main-gradient py-3">
          <div className="container flex items-center justify-between">
            <button className="text-white" onClick={() => setShowSidebar(true)}>
              <HiMenu size={30} />
            </button>

            <Logo wrapperClasses="w-[200px] h-[30px]" textWhite />

            <button
              className="text-white"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              <HiSearch size={30} />
            </button>
          </div>
        </div>

        <div
          className={`absolute top-full right-0 left-0 ${
            showSearchBar ? "translate-y-0" : "-translate-y-full"
          } transition z-[-1]`}
        >
          <SearchBar isMobile />
        </div>
      </header>
      <Modal
        ref={modalRef}
        initialFocusRef={modalRef}
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        showCloseIcon={false}
        classNames={{
          modalContainer: "root-sidebar",
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOut: "customLeaveOverlayAnimation",
          modalAnimationIn: "customRootSidebarEnter",
          modalAnimationOut: "customRootSidebarLeave",
        }}
      >
        <>
          <RootSidebar />
        </>
      </Modal>
    </>
  );
};

export default MobileHeader;
