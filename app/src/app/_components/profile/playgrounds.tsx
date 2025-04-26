"use client";

import { useState } from "react";
import { Search, Clock, Trash2, MoreVertical } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";
import type { Playground } from "@prisma/client";

export function PlaygroundMenu({
  playgrounds,
  userName,
}: {
  playgrounds: Playground[];
  userName: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Format date to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (dateString: Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString();
  };

  // Filter playgrounds based on search query
  const filteredPlaygrounds = playgrounds.filter((playground) =>
    playground.figure.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <div className="mb-6">
        <h1 className="font-['Instrument Sans'] mb-2 text-4xl font-bold text-white">
          Hello, <span className="text-[#F3B518]">{userName}</span>
        </h1>
        <p className="text-gray-400">Access your saved playground sessions</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search playgrounds..."
          className="border-gray-700 bg-gray-800 pl-10 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlaygrounds.map((playground) => (
          <Link href={`/playground/${playground.id}`} key={playground.id}>
            <Card
              className="border-l-4 border-gray-700 bg-black text-white transition-colors hover:bg-gray-700"
              style={{ borderLeftColor: "#F3B518" }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center text-lg">
                      {playground.name ?? `Playground ${playground.id}`}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Date: {playground.createdAt.toLocaleDateString()}...
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="border-gray-700 bg-gray-800 text-white"
                    >
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-gray-700">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardFooter className="flex items-center pt-2 text-xs text-gray-400">
                <Clock className="mr-1 h-3 w-3" /> Last modified{" "}
                {formatRelativeTime(playground.updatedAt)}
              </CardFooter>
            </Card>
          </Link>
        ))}

        <Link href="/menu">
          <Card className="flex h-full min-h-32 items-center justify-center border-gray-700 bg-black text-white transition-colors hover:bg-gray-700">
            <Button
              className="text-lg font-medium"
              style={{ backgroundColor: "#F3B518", color: "black" }}
            >
              + New Playground
            </Button>
          </Card>
        </Link>
      </div>
    </div>
  );
}
