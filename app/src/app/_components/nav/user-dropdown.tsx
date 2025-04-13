"use client";

import React from "react";
import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import Link from "next/link";

import { api } from "~/trpc/react";

export function UserDropdown() {
    const { data } = api.user.getUserAvatar.useQuery();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded cursor-pointer">
                    <Avatar>
                        <AvatarImage src={`${data ? data.avatar : ""}`} />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    {data ? data.name: "My Account"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link
                        href="/edit"
                        className="relative flex h-full items-center justify-center rounded-lg px-8 py-2 font-normal text-white uppercase shadow-md transition-colors duration-300 hover:bg-white/10"
                        >
                        Edit Profile
                        <span className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 ease-in-out hover:w-full"></span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <button
                          onClick={() => signOut()}
                          className="relative flex h-full items-center justify-center rounded-lg px-8 py-2 font-normal text-white uppercase shadow-md transition-colors duration-300 hover:bg-white/10"
                        >
                          Logout
                          <span className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 ease-in-out hover:w-full"></span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}