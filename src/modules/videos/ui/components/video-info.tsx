import { formatDistanceToNow } from "date-fns";
import { useMemo } from "react";
import Link from "next/link";
import { Route } from "next";

import { UserAvatar } from "@/components/user-avatar";
import { UserInfo } from "@/modules/users/ui/components/user-info";
import { Skeleton } from "@/components/ui/skeleton";

import { VideoGetManyOutput } from "../../types";

import { VideoMenu } from "./video-menu";

interface VideoInfoProps {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
}

export const VideoInfoSkeleton = () => {
  return (
    <div className="flex gap-3">
      <Skeleton className="size-10 flex-shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-5 w-[90%]" />
        <Skeleton className="h-5 w-[70%]" />
      </div>
    </div>
  );
};

export const VideoInfo = ({ data, onRemove }: VideoInfoProps) => {
  const compactViews = useMemo(
    () =>
      Intl.NumberFormat("en", { notation: "compact" }).format(data.viewCount),
    [data.viewCount]
  );
  const compactDate = useMemo(
    () => formatDistanceToNow(data.createdAt, { addSuffix: true }),
    [data.createdAt]
  );

  return (
    <div className="flex gap-3">
      <Link
        prefetch
        href={`/users/${data.user.id}` as Route}>
        <UserAvatar
          imageUrl={data.user.imageUrl}
          name={data.user.name}
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          prefetch
          href={`/videos/${data.id}`}>
          <h3 className="line-clamp-1 break-words text-base font-medium lg:line-clamp-2">
            {data.title}
          </h3>
        </Link>
        <Link
          prefetch
          href={`/users/${data.user.id}` as Route}>
          <UserInfo name={data.user.name} />
        </Link>
        <Link
          prefetch
          href={`/videos/${data.id}`}>
          <p className="line-clamp-1 text-sm text-gray-600">
            {compactViews} views • {compactDate}
          </p>
        </Link>
      </div>
      <div className="flex-shrink-0">
        <VideoMenu
          videoId={data.id}
          onRemove={onRemove}
        />
      </div>
    </div>
  );
};
