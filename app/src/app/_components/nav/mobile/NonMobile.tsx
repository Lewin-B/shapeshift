"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import type { LinkProps } from "next/link";

// Define routes as constants
export const ROUTES = {
  HOME: "/",
  playground: "/menu",
  canvas: "/canvas",
};

// Props for CustomNavLink component
interface CustomNavLinkProps extends LinkProps {
  children: React.ReactNode;
  hovering?: boolean;
  className: string;
  onMouseLeave?: () => void;
}

// Custom navigation link component
export const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  children,
  hovering,
  onMouseEnter,
  onMouseLeave,
  className,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = props.href == pathname;

  return (
    <Link
      className={`${
        isActive
          ? `${
              isActive && !hovering ? "underline-force highlight" : ""
            } hover:text-pipeline-blue-200 relative flex h-full cursor-default items-center justify-center px-4 text-center uppercase transition-colors duration-300 ${className}`
          : `underline-hover hover:text-pipeline-blue-200 relative flex h-full items-center justify-center px-4 text-center uppercase transition-colors duration-300 ${className}`
      }`}
      {...props}
    >
      {children}
      <span className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 ease-in-out hover:w-full"></span>
    </Link>
  );
};

// Props for NonMobileNavbar component
interface NonMobileNavbarProps {
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
  pfp?: string;
}

// Main NonMobileNavbar component
const NonMobileNavbar: React.FC<NonMobileNavbarProps> = ({ user, pfp }) => {
  const [hovering, setHovering] = useState(false);
  const [hovering2, setHovering2] = useState(false);

  return (
    <div className="mx-12 hidden h-full flex-row items-center justify-between text-center md:flex">
      {/* Logo on the left */}
      <Link href="/">
        <div className="flex flex-row items-center justify-center gap-0">
          <Image
            alt="c"
            src="/logo.svg"
            width={0}
            height={0}
            className={`h-12 w-12 pr-2 transition-colors duration-300 ${
              hovering2 ? "text-pipeline-blue-200 animate-pulse" : "text-white"
            }`}
          />
          <h1
            className="hover:text-pipeline-blue-200 text-2xl font-bold text-white transition-colors duration-300"
            onMouseEnter={() => setHovering2((prev) => !prev)}
            onMouseLeave={() => setHovering2((prev) => !prev)}
          >
            <span className="font-instrument text-[30px] leading-[49px] font-semibold text-[#FFD874]">
              ShapeShift
            </span>
          </h1>
        </div>
      </Link>

      {/* Navigation links and auth buttons all on the right */}
      <div className="flex flex-row items-center justify-end gap-4">
        <CustomNavLink
          href={ROUTES.playground}
          onMouseEnter={() => setHovering((prev) => !prev)}
          onMouseLeave={() => setHovering((prev) => !prev)}
          hovering={hovering}
          className="hover:text-[#F3B518]"
        >
          Playground
        </CustomNavLink>
        <CustomNavLink
          href={ROUTES.canvas}
          onMouseEnter={() => setHovering2((prev) => !prev)}
          onMouseLeave={() => setHovering2((prev) => !prev)}
          hovering={hovering}
          className="hover:text-[#F3B518]"
        >
          Canvas
        </CustomNavLink>

        {!user && (
          <button
            onClick={(e) => {
              console.log("Sign in");
            }}
            className="relative flex h-full items-center justify-center rounded-lg px-8 py-2 font-medium text-white uppercase shadow-md transition-colors duration-300 hover:bg-white/10 bg-[#030303]"
          >
            Login
            <span className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 ease-in-out hover:w-full"></span>
          </button>
        )}

        {user && (
          <>
            <Link
              href="/edit"
              className="relative flex h-full items-center justify-center rounded-lg px-8 py-2 font-normal text-white uppercase shadow-md transition-colors duration-300 hover:bg-white/10"
            >
              Edit Profile
              <span className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 ease-in-out hover:w-full"></span>
            </Link>

            <button
              onClick={() => signOut()}
              className="relative flex h-full items-center justify-center rounded-lg px-8 py-2 font-normal text-white uppercase shadow-md transition-colors duration-300 hover:bg-white/10"
            >
              Logout
              <span className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 ease-in-out hover:w-full"></span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NonMobileNavbar;
