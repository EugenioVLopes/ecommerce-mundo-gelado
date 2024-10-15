import React from "react";
import { Skeleton } from "@components/ui/skeleton";

const SkeletonMenuItem = () => (
  <div className="bg-purple-100 p-4 rounded-lg shadow-md text-center flex flex-col items-center">
    <Skeleton className="w-24 h-24 rounded-full" />
    <Skeleton className="h-4 w-3/4 mt-4" />
    <Skeleton className="h-4 w-1/2 mt-2" />
    <Skeleton className="h-4 w-1/4 mt-2" />
    <Skeleton className="h-10 w-3/4 mt-4 rounded-full" />
  </div>
);

export default function Loading() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonMenuItem />
        <SkeletonMenuItem />
        <SkeletonMenuItem />
        <SkeletonMenuItem />
        <SkeletonMenuItem />
        <SkeletonMenuItem />
      </div>
    </div>
  );
}
