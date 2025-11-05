import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs/server";

export default async function Loading() {
  // const user = await currentUser();

  // // If no user is signed in, render a minimal/simple loader for the public landing page.
  // if (!user) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600" />
  //     </div>
  //   );
  // }

  // If the user is signed in, render the richer skeleton layout used for the authenticated landing.
  return (
    <div className="flex flex-col space-y-5 h-screen">
      <div className="flex justify-center w-full">
        <Skeleton className="h-[20rem] w-full bg-slate-400 rounded-xl" />
      </div>
      <div className="flex flex-between">
        <div />
        <Skeleton className="h-10 bg-slate-400 w-[24rem]" />
      </div>
      <div className="flex gap-4 w-full flex-wrap justify-center">
        {[0, 1, 2, 3, 4, 5].map((_, j) => (
          <Skeleton
            key={j}
            className="h-[17rem] w-[19rem] bg-slate-400 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}
