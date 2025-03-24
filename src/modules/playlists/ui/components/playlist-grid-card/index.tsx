import Link from "next/link";
import { Route } from "next";

import { PlaylistGetManyOutput } from "@/modules/playlists/types";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";

import {
  PlaylistThumbnail,
  PlaylistThumbnailSkeleton,
} from "./playlist-thumbnail";
import { PlaylistInfo, PlaylistInfoSkeleton } from "./playlist-info";

interface PlaylistGridCardProps {
  data: PlaylistGetManyOutput["items"][number];
}

export const PlaylistGridCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <PlaylistThumbnailSkeleton />
      <PlaylistInfoSkeleton />
    </div>
  );
};

export const PlaylistGridCard = ({ data }: PlaylistGridCardProps) => {
  return (
    <Link href={`/playlists/${data.id}` as Route}>
      <div className="group flex w-full flex-col gap-2">
        <PlaylistThumbnail
          imageURL={data.thumbnailUrl || THUMBNAIL_FALLBACK}
          title={data.name}
          videoCount={data.videoCount}
        />
        <PlaylistInfo data={data} />
      </div>
    </Link>
  );
};
