import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/client";

import { VideoGetOneOutput } from "../../types";

interface VideoReactionsProps {
  videoId: string;
  likes: number;
  dislikes: number;
  viewerReaction: VideoGetOneOutput["viewerReaction"];
}

export const VideoReactions = ({
  videoId,
  likes,
  dislikes,
  viewerReaction,
}: VideoReactionsProps) => {
  const clerk = useClerk();
  const utils = trpc.useUtils();

  const like = trpc.videoReactions.like.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
    },
    onError: (error) => {
      toast.error(error.message);
      if (error.data?.code === "UNAUTHORIZED") clerk.openSignIn();
    },
  });
  const dislike = trpc.videoReactions.dislike.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
    },
    onError: (error) => {
      toast.error(error.message);
      if (error.data?.code === "UNAUTHORIZED") clerk.openSignIn();
    },
  });

  return (
    <div className="flex flex-none items-center">
      <Button
        onClick={() => like.mutate({ videoId })}
        disabled={like.isPending || dislike.isPending}
        variant="secondary"
        className="gap-2 rounded-l-full rounded-r-none pr-4">
        <ThumbsUpIcon
          className={cn("size-5", viewerReaction === "like" && "fill-black")}
        />
        {likes}
      </Button>
      <Separator
        orientation="vertical"
        className="h-7"
      />
      <Button
        onClick={() => dislike.mutate({ videoId })}
        disabled={like.isPending || dislike.isPending}
        variant="secondary"
        className="rounded-l-none rounded-r-full pl-3">
        <ThumbsDownIcon
          className={cn("size-5", viewerReaction === "dislike" && "fill-black")}
        />
        {dislikes}
      </Button>
    </div>
  );
};
