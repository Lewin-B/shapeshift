"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import type { LinkProps } from "next/link";
import { GithubSignIn } from "../server/signin";
import { Button } from "~/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const OVERLAY_CLASS =
  "absolute left-0 top-16 z-50 flex h-96 w-full flex-col items-center justify-center bg-black/90 bg-opacity-5 shadow-md backdrop-blur-3xl backdrop-filter md:hidden";

interface MobileNavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  children,
  className,
  ...props
}) => (
  <Link
    className={className ?? "pb-7 text-xl font-medium text-white uppercase"}
    {...props}
  >
    {children}
  </Link>
);

interface MobileNavigationBarProps {
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
  toggleMobileNavbar: (state: boolean) => void;
  mobileNavbar: boolean;
}

const MobileNavigationBar: React.FC<MobileNavigationBarProps> = ({
  user,
  toggleMobileNavbar,
  mobileNavbar,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="absolute top-0 left-0 mx-12 flex h-16 w-full flex-row items-center justify-start text-center hover:cursor-pointer md:hidden">
        <div onClick={() => toggleMobileNavbar(!mobileNavbar)}>
          <svg
            viewBox="0 0 20 20"
            fill="#ffff"
            className="absolute top-5 right-5 mx-12 h-8 w-8 md:hidden"
          >
            {!mobileNavbar && (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </div>
        <div>
          <Link href="/">
            <div className="flex flex-row items-center justify-center gap-4 md:hidden">
              <Image
                alt="c"
                src="/logo.svg"
                width={0}
                height={0}
                className="h-12 w-12 pr-2 transition-colors duration-300"
              />
              <h1 className="text-2xl font-bold text-white">ShapeShift</h1>
            </div>
          </Link>
        </div>
      </div>

      {mobileNavbar && (
        <>
          <div
            onClick={() => toggleMobileNavbar(!mobileNavbar)}
            className="hover:cursor-pointer"
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="#ffff"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-5 right-5 h-8 w-8"
            >
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
            </svg>
          </div>

          <ul onClick={() => toggleMobileNavbar(!mobileNavbar)}>
            <div className={OVERLAY_CLASS}>
              <MobileNavLink href={"/menu"}>Playground</MobileNavLink>

              <MobileNavLink href={"/canvas"}>Canvas</MobileNavLink>

              {user && <MobileNavLink href={"/profile"}>Profile</MobileNavLink>}

              {!user && (
                <Button
                  size="lg"
                  onClick={GithubSignIn}
                  className="bg-gray-900 text-[#FFD874] opacity-100"
                >
                  Sign in with <GitHubLogoIcon className="ml-1" />
                </Button>
              )}

              {user && (
                <>
                  <button
                    onClick={async () => {
                      await signOut();
                      router.push("/");
                    }}
                    className="mt-4 text-xl font-light text-white uppercase"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </ul>
        </>
      )}
    </>
  );
};

export default MobileNavigationBar;
