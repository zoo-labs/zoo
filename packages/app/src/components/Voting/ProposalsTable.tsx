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

  // return (
  //   <>
  //     {_proposals?.length === 0 ? (
  //       <p className="py-10 text-xl font-semibold text-center">
  //         No proposals Found
  //       </p>
  //     ) : (
  //       _proposals.map((_, i) => (
  //         <div
  //           key={i}
  //           className={`py-7 px-4 md:px-12 flex items-center justify-between cursor-pointer ${
  //             i + 1 !== _proposals.length && "border-b border-space-grey"
  //           }`}
  //           onClick={() => {
  //             if (state === ProposalState.ONGOING) push(`/dao/${_.id}`);
  //             else if (state === ProposalState.PENDING)
  //               toast("Voting is yet to start", {
  //                 type: "info",
  //                 position: "top-center",
  //               });
  //           }}
  //         >
  //           <div>
  //             <p className="mb-3 text-sm font-semibold md:text-2xl">
  //               {_.title}
  //             </p>
  //             <p className="mb-4 text-xs md:text-lg">
  //               {state === ProposalState.PENDING
  //                 ? ` Starts ${getDay(new Date(_.startTime))}`
  //                 : ` Ends ${getDay(new Date(_.endTime))}`}
  //             </p>
  //             <div className="flex items-center gap-3">
  //               <button
  //                 className={`rounded-full py-2 md:py-3.5 px-3 md:px-5 ${
  //                   state === ProposalState.PENDING
  //                     ? "bg-space-yellow"
  //                     : state === ProposalState.ONGOING
  //                     ? "bg-space-green"
  //                     : "bg-space-gray-500"
  //                 }  text-sm font-medium`}
  //               >
  //                 {state === ProposalState.PENDING
  //                   ? "Starting Soon"
  //                   : state === ProposalState.ONGOING
  //                   ? "Vote Now"
  //                   : "Vote Closed"}
  //               </button>
  //               {_?.proposalType === 0 ? (
  //                 <button className="rounded-full py-2 md:py-3.5 px-3 md:px-5 border border-space-purple text-space-purple text-sm font-medium">
  //                   Core
  //                 </button>
  //               ) : (
  //                 <button className="rounded-full py-2 md:py-3.5 px-3 md:px-5 border border-space-pink text-space-pink text-sm font-medium">
  //                   Community
  //                 </button>
  //               )}
  //             </div>
  //           </div>
  //           <Image
  //             src="/icons/arrow-right.svg"
  //             alt=""
  //             height={30}
  //             width={30}
  //             className="cursor-pointer"
  //           />
  //         </div>
  //       ))
  //     )}
  //   </>
  // );
  return (
    <>
      {_proposals?.length === 0 ? (
        <p
          className="border border-white-10 rounded-2xl py-10 text-xl font-semibold text-center px-5 mb-10"
          style={{
            backdropFilter: "blur(100px)",
          }}
        >
          No proposals Found
        </p>
      ) : (
        _proposals.map((_, i) => {
          const proposalType = _.proposalType === 0 ? "Core" : "Community";
          // const proposalState = _.proposalState === 0 ? "Ongoing" : "Closed";
          const proposalState = (() => {
            if (state === ProposalState.PENDING) {
              return "Soon";
            } else if (state === ProposalState.ONGOING) {
              return "Vote Now";
            } else {
              return "Closed";
            }
          })();
          return (
            <div
              key={_.id}
              className="border border-white-10 rounded-2xl py-6 px-5 mb-10 cursor-pointer"
              style={{
                backdropFilter: "blur(100px)",
              }}
              onClick={() => {
                if (state === ProposalState.ONGOING) push(`/dao/${_.id}`);
                else if (state === ProposalState.PENDING)
                  toast("Voting is yet to start", {
                    type: "info",
                    position: "top-center",
                  });
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <p className="text-activeGreen text-sm font-light mr-6">
                    {state === ProposalState.PENDING
                      ? ` Starts ${getDay(new Date(_.startTime))}`
                      : ` Ends ${getDay(new Date(_.endTime))}`}
                  </p>
                  <div className="text-activeGreen text-[10px] font-light border border-activeGreen py-1 px-2 rounded-full">
                    {proposalType}
                  </div>
                </div>
                <div
                  className={`text-xs bg-green py-2 px-5 text-white rounded-full ${
                    state === ProposalState.PENDING
                      ? "bg-zoo-yellow"
                      : state === ProposalState.ONGOING
                      ? "bg-zoo-green"
                      : "bg-gray-500"
                  }  text-sm font-medium
  `}
                >
                  {proposalState}
                </div>
              </div>
              <p className="text-lg mb-3 max-w-[90%]">{_.title}</p>
              <p
                className="text-sm max-w-[85%]"
                dangerouslySetInnerHTML={{ __html: _.description }}
              />
            </div>
          );
        })
      )}
    </>
  );
};

export default ProposalsTable;
