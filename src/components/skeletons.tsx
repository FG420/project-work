import React from 'react';
import { Skeleton } from './ui/skeleton';

export function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[320px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function ItemsSkeleton() {
  return (
    <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function PagesSkeleton() {
  return (
    <div className="flex flex-col space-y-3 p-4">
      <Skeleton className="h-[46px] w-full rounded-xl" />
      <div className="space-y-1">
        <Skeleton className="h-[65px] w-full" />
        <Skeleton className="h-[65px] w-full" />
        <Skeleton className="h-[65px] w-full" />
        <Skeleton className="h-[65px] w-full" />
        <Skeleton className="h-[65px] w-full" />
      </div>
    </div>
  );
}
