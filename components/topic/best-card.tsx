import First from "@/public/svg/first.svg";
import Second from "@/public/svg/second.svg";
import Third from "@/public/svg/third.svg";
import Heart from "@/public/svg/heart.svg";
import { ReactNode } from "react";
import useLikeVoteTopic from "@/app/vote-topic/hooks/use-recommend-vote-topic";

interface ITopicBestCardProps {
  readonly ranking: number;
  readonly topic: string;
  readonly topicId: number;
  readonly recommendCount: number;
  readonly isRecommended: boolean;
}

const RANKING: { [key: number]: ReactNode | string } = {
  1: <First className="h-[24px] w-[24px] lg:h-[32px] lg:w-[32px]" />,
  2: <Second className="h-[24px] w-[24px] lg:h-[32px] lg:w-[32px]" />,
  3: <Third className="h-[24px] w-[24px] lg:h-[32px] lg:w-[32px]" />,
  4: "4",
  5: "5",
};

export default function BestCard({
  ranking,
  topic,
  topicId,
  recommendCount = 0,
  isRecommended,
}: ITopicBestCardProps) {
  const { mutate } = useLikeVoteTopic();

  const handleClickRecommendButton = () => {
    mutate(topicId);
  };

  return (
    <div className="group flex h-[60px] cursor-pointer items-center border-b border-b-white-006 hover:bg-white-004 lg:h-[100px]">
      <div className="flex h-full w-[102px] items-center justify-center">
        {typeof RANKING[ranking] === "string" ? (
          <span className="flex items-center justify-center text-[14px] font-semibold leading-[14px] text-gray-003 lg:text-[20px] lg:leading-[20px]">
            {RANKING[ranking]}
          </span>
        ) : (
          <div className="flex items-center justify-center">
            {RANKING[ranking]}
          </div>
        )}
      </div>
      <div className="flex h-full grow items-center">
        <p className="truncate text-[14px] font-bold leading-[19.6px] text-black-001 lg:text-[22px] lg:leading-[22px]">
          {topic}
        </p>
      </div>
      <div className="flex h-full w-[100px] items-center justify-center">
        <button
          className="flex h-[10px] w-[12px] items-center justify-center lg:h-[16px] lg:w-[20px]"
          onClick={handleClickRecommendButton}
        >
          <Heart
            className={`${isRecommended ? "fill-red-002" : "fill-gray-004"}`}
          />
        </button>
        <span className="ml-[6px] text-[12px] font-medium leading-[16px] text-gray-004 group-hover:text-black-001 lg:text-[16px] lg:leading-[16px]">
          {recommendCount}
        </span>
      </div>
    </div>
  );
}
