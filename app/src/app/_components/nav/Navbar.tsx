"use client";
import { useState } from "react";
import NonMobileNavbar from "./mobile/NonMobile";
import MobileNavigationBar from "./mobile/MobileNavigationBar";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [mobileNavbar, setMobileNavbar] = useState(false);

  const session = useSession();

  return (
    <>
      <header
        className={`fixed top-3 left-0 h-16 w-full px-12 sm:p-0 ${mobileNavbar ? "bg-opacity-5 z-50 bg-black/90 shadow-md backdrop-blur-lg backdrop-filter" : "bg-opacity-5 z-50 bg-transparent shadow-md backdrop-blur-lg backdrop-filter"}`}
      >
        <NonMobileNavbar pfp={""} user={session.data?.user} />
        <MobileNavigationBar
          user={session.data?.user}
          toggleMobileNavbar={setMobileNavbar}
          mobileNavbar={mobileNavbar}
        />
      </header>
    </>
  );
};

export default Navbar;
