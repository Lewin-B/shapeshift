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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import Link from "next/link";
import type { Playground } from "@prisma/client";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export function PlaygroundMenu({
  playgrounds: initialPlaygrounds,
  userName,
}: {
  playgrounds: Playground[];
  userName: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [playgrounds, setPlaygrounds] = useState(initialPlaygrounds);

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [currentPlayground, setCurrentPlayground] = useState<Playground | null>(
    null,
  );
  const [newName, setNewName] = useState("");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [playgroundToDelete, setPlaygroundToDelete] =
    useState<Playground | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const renameMutation = api.playground.savePlayground.useMutation({
    onSuccess: () => {
      toast("Playground succesfully renamed");
    },
  });

  const deleteMutation = api.playground.deletePlayground.useMutation({
    onSuccess: () => {
      toast("Playground succesfully deleted");
    },
  });

  const formatRelativeTime = (dateString: Date) => {
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString();
  };

  const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedQuery, "i");

  const filteredPlaygrounds = playgrounds
    .filter((playground) => {
      const nameToTest = playground.name ?? "";
      const idLabel = `Playground ${playground.id}`;

      return regex.test(nameToTest) || regex.test(idLabel);
    })
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

  const handleRenameClick = (e: React.MouseEvent, playground: Playground) => {
    e.stopPropagation();
    setCurrentPlayground(playground);
    setNewName(playground.name || `Playground ${playground.id}`);
    setIsRenameDialogOpen(true);
  };

  // Submit rename operation
  const handleRenameSubmit = async () => {
    if (!currentPlayground || !newName.trim()) return;

    setIsLoading(true);
    try {
      // Call parent handler if provided
      renameMutation.mutate({
        ...currentPlayground,
        playgroundId: currentPlayground.id,
        name: newName.trim(),
        figureCode: currentPlayground.figure,
        canvasCode: currentPlayground.canvas,
        appCode: currentPlayground.app,
        styleCode: currentPlayground.style,
      });

      // Update local state
      setPlaygrounds(
        playgrounds.map((p) =>
          p.id === currentPlayground.id ? { ...p, name: newName.trim() } : p,
        ),
      );

      setIsRenameDialogOpen(false);
    } catch (error) {
      console.error("Failed to rename playground:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, playground: Playground) => {
    e.preventDefault();
    e.stopPropagation();
    setPlaygroundToDelete(playground);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!playgroundToDelete) return;

    setIsLoading(true);
    try {
      // Call parent handler if provided
      deleteMutation.mutate({
        id: playgroundToDelete.id,
      });

      // Update local state
      setPlaygrounds(playgrounds.filter((p) => p.id !== playgroundToDelete.id));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete playground:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
                      {playground.name || `Playground ${playground.id}`}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Date:{" "}
                      {new Date(playground.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
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
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-700"
                        onClick={(e) => handleRenameClick(e, playground)}
                      >
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-500 hover:bg-gray-700"
                        onClick={(e) => handleDeleteClick(e, playground)}
                      >
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

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="border-gray-700 bg-black text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename playground</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter a new name for this playground
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border-gray-700 bg-gray-900 text-white"
              placeholder="Enter playground name"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRenameDialogOpen(false)}
              className="border-gray-600 bg-transparent text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRenameSubmit}
              disabled={isLoading || !newName.trim()}
              className="bg-[#F3B518] text-black hover:bg-[#d9a316]"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="border-gray-700 bg-black text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {`This will permanently delete your playground "
              ${
                playgroundToDelete?.name ??
                `Playground ${playgroundToDelete?.id}`
              }
              ". This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 bg-transparent text-white hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isLoading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
