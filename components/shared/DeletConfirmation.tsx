"use client";

import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteImage } from "@/lib/actions/image.action";

import { Button } from "../ui/button";

export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full rounded-full">
        <Button
          type="button"
          className="bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 hover:from-rose-600 hover:via-red-600 hover:to-pink-600 text-white font-semibold rounded-xl py-6 px-6 w-full shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 transition-all duration-300 border-0"
          variant="destructive"
        >
          Delete Image
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl max-w-md">
        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Delete Image?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            This action cannot be undone. This will permanently delete your transformed image from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-3 mt-6">
          <AlertDialogCancel className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 rounded-xl font-semibold px-6 py-2.5 transition-all duration-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 hover:from-rose-600 hover:via-red-600 hover:to-pink-600 text-white font-semibold rounded-xl px-6 py-2.5 shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300 border-0"
            onClick={() =>
              startTransition(async () => {
                await deleteImage(imageId);
              })
            }
          >
            {isPending ? "Deleting..." : "Delete Image"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};