import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonCard() {
  return (
    <div className='flex flex-col space-y-5 h-screen'>
      <div className='flex justify-center w-full'>
        <Skeleton className='h-[20rem] w-full bg-slate-400 rounded-xl' />
      </div>
      <div className='flex flex-between'>
        <div></div>
        <Skeleton className='h-10 bg-slate-400 w-[24rem]' />
      </div>
      <div className='flex gap-4 w-full flex-wrap justify-center'>
        {[0, 1, 2, 3, 4, 5].map((i, j) => {
          return (
            <Skeleton
              key={j}
              className='h-[17rem] w-[19rem] bg-slate-400 rounded-xl'
            />
          );
        })}
      </div>
    </div>
  );
}
