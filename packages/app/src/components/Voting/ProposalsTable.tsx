import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format, differenceInSeconds } from "date-fns";
import { toast } from "react-toastify";
import { ProposalState } from "hooks/useVote";
import { filteredProposals, getProposalState } from "functions/proposal";
import { Proposal } from "types";

const ProposalsTable = ({
  proposals,
  state,
  type,
}: {
  proposals: Proposal[];
  state: string;
  type: number;
}) => {
  const { push } = useRouter();
  const [_proposals, _setProposals] = useState([]);

  const getDay = (time) => {
    const date = new Date(time);
    return format(date, "MMMM dd, yyyy | hh:mm a");
  };
  useEffect(() => {
    console.log("ProposalsTable", proposals, type, state);
    _setProposals(filteredProposals(proposals, type, state));
  }, [proposals, state, type]);

  return (
    <>
      {_proposals?.length === 0 ? (
        <p className="py-10 text-xl font-semibold text-center">
          No proposals Found
        </p>
      ) : (
        _proposals.map((_, i) => (
          <div
            key={i}
            className={`py-7 px-4 md:px-12 flex items-center justify-between cursor-pointer ${
              i + 1 !== _proposals.length && "border-b border-space-grey"
            }`}
            onClick={() => {
              if (state === ProposalState.ONGOING) push(`/dao/${_.id}`);
              else if (state === ProposalState.PENDING)
                toast("Voting is yet to start", {
                  type: "info",
                  position: "top-center",
                });
            }}
          >
            <div>
              <p className="mb-3 text-sm font-semibold md:text-2xl">
                {_.title}
              </p>
              <p className="mb-4 text-xs md:text-lg">
                {state === ProposalState.PENDING
                  ? ` Starts ${getDay(new Date(_.startTime))}`
                  : ` Ends ${getDay(new Date(_.endTime))}`}
              </p>
              <div className="flex items-center gap-3">
                <button
                  className={`rounded-full py-2 md:py-3.5 px-3 md:px-5 ${
                    state === ProposalState.PENDING
                      ? "bg-space-yellow"
                      : state === ProposalState.ONGOING
                      ? "bg-space-green"
                      : "bg-space-gray-500"
                  }  text-sm font-medium`}
                >
                  {state === ProposalState.PENDING
                    ? "Starting Soon"
                    : state === ProposalState.ONGOING
                    ? "Vote Now"
                    : "Vote Closed"}
                </button>
                {_?.proposalType === 0 ? (
                  <button className="rounded-full py-2 md:py-3.5 px-3 md:px-5 border border-space-purple text-space-purple text-sm font-medium">
                    Core
                  </button>
                ) : (
                  <button className="rounded-full py-2 md:py-3.5 px-3 md:px-5 border border-space-pink text-space-pink text-sm font-medium">
                    Community
                  </button>
                )}
              </div>
            </div>
            <Image
              src="/icons/arrow-right.svg"
              alt=""
              height={30}
              width={30}
              className="cursor-pointer"
            />
          </div>
        ))
      )}
    </>
  );
};

export default ProposalsTable;
