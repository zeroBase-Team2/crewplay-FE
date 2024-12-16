import CandidateList from "@/components/vote/vote-result-candidate-list";
import MainButton from "@/components/main-button";
import { atomUserAuth } from "@/jotai/user-auth";
import { atomSelectedCandidate } from "@/jotai/vote";
import { useAtomValue } from "jotai";
import useGetThisWeekVoteCandidates from "../../app/(home)/hooks/use-get-this-week-vote-candidates";
import ThisWeekVoteCandidateList from "../../app/(home)/components/this-week-vote/this-week-vote-candidate-list";
import useThisWeekVote from "../../app/(home)/hooks/use-this-week-vote";
import DateAndParticipantCount from "@/app/vote-result/components/date-and-participant-count";
import { usePathname } from "next/navigation";
import NotExist from "../not-exist";
import { formattingDateTime } from "@/utils/format-value";
import Spinner from "../spinner";

export default function ThisWeekVoteCandidate() {
  const pathname = usePathname();
  const userAuth = useAtomValue(atomUserAuth);
  const selectedCandidateId = useAtomValue(atomSelectedCandidate);

  const isLogin = userAuth.role !== "ANONYMOUS";
  const isUseDateAndParticipantCount = pathname === "/vote-result";

  const { data, isLoading, isError } = useGetThisWeekVoteCandidates(isLogin);
  const { mutate } = useThisWeekVote();

  const handleClickVoteButton = () => {
    mutate({ voteId: voteId, candidateId: selectedCandidateId });
  };

  if (isLoading) return <Spinner />;

  if (isError)
    return <NotExist text="에러가 발생하였습니다. 다시 조회해주세요." />;

  if (!data || !data.data) return <NotExist text="등록된 투표가 없습니다." />;

  const {
    voteId,
    resultType,
    vote,
    topic,
    startDate,
    endDate,
    totalVote,
    myVote,
  } = data.data;

  const hasVoted = resultType === "VOTE";
  const isDisabled = selectedCandidateId === -1;
  const isBestCandidate = vote.reduce((max, current) => {
    return current.voteCount > max.voteCount ? current : max;
  });

  return (
    <>
      <h2 className="mx-auto mb-[32px] mt-[22px] w-[256px] text-center text-[30px] font-bold leading-[42px] lg:mb-[65px] lg:w-[511px] lg:text-[60px] lg:leading-[84px]">
        {topic}
      </h2>
      <div>
        {hasVoted ? (
          <>
            <ThisWeekVoteCandidateList candidates={vote} />
            <div className="mt-[20px] lg:mt-[30px]">
              <MainButton
                text="투표하기"
                onClick={handleClickVoteButton}
                isDisabled={isDisabled || !isLogin}
              />
            </div>
          </>
        ) : (
          <CandidateList
            candidates={vote}
            myVote={myVote}
            isBestCandidateId={isBestCandidate.candidateId}
            totalVote={totalVote}
          />
        )}
      </div>
      {isUseDateAndParticipantCount && (
        <DateAndParticipantCount
          voteDate={`${formattingDateTime(startDate)} - ${formattingDateTime(endDate)}`}
          totalParticipantCount={totalVote || 0}
        />
      )}
    </>
  );
}
