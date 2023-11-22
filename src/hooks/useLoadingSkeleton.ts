import { useCallback } from "react";

type SkeletonItem = (value: any, key: number) => JSX.Element;

type LoadingSkeleton = (
  skeletonItem: SkeletonItem,
  repeat: number
) => JSX.Element[];

export const useLoadingSkeleton = () => {
  return useCallback<LoadingSkeleton>(
    (skeletonItem: SkeletonItem, repeat: number) =>
      [...Array(repeat)].map((e, i) => skeletonItem(e, i)),
    []
  );
};
