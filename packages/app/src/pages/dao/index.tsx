import ProposalsTable from "components/Voting/ProposalsTable";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { ProposalState } from "hooks/useVote";
import Head from "next/head";
import { ChainId } from "constants/chainIds";
const Voting = () => {
  const [proposalState, setProposalState] = useState(ProposalState.ONGOING);
  const [proposalType, setProposalType] = useState(3);
  const [_proposals, setProposals] = useState([]);
  const { proposals }: any = useSelector((state: any) => state.voting);
  const { chainId, account } = useActiveWeb3React();
  useEffect(() => {
    if (proposals) {
      setProposals(proposals);
    }
  }, [proposals]);

  // const getAllProposals = useGetAllProposals();

  // useEffect(() => {
  //   getAllProposals();
  // }, [account, chainId, getAllProposals]);
  console.log("voting proposals", proposals, _proposals);
  return (
    <>
      <Head>
        <title>ZOO | DAO</title>
      </Head>
      <div className="Home flex flex-col justify-center items-center min-h-[70vh]">
        <div className="w-full px-4 py-16 mx-auto lg:max-w-7xl mt-14">
          <div
            className="py-10 px-7 md:px-20 md:py-16 rounded-2xl mb-9"
            style={{
              backgroundImage: "url(/images/voting-banner.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="font-bold text-3xl md:text-6xl mb-2.5 md:mb-5">
              Vote
            </p>
            <p className="text-sm font-normal md:text-3xl">
              Lend your voice to the future of ZOO
            </p>
          </div>
          <div className="flex items-center justify-between w-full mb-9">
            <p className="text-lg font-semibold md:text-4xl">Proposals</p>
            <button className="rounded-full bg-proposal-button px-2.5 md:px-5 py-2.5 md:py-4">
              <Link href="/dao/proposal/create" passHref>
                <div className="flex items-center gap-3">
                  <Image src="/icons/paper.svg" alt="" height={24} width={24} />
                  <p className="text-xs font-medium md:text-base">
                    Make a proposal
                  </p>
                </div>
              </Link>
            </button>
          </div>
          <div className="w-full border rounded-3xl border-space-grey bg-space-dark">
            <div className="flex items-center justify-between w-full px-4 py-6 bg-space-grey md:px-12 rounded-t-3xl">
              <div className="flex gap-3.5 md:gap-6 items-center text-sm md:text-xl">
                <p
                  className={`${
                    proposalType === 3
                      ? "text-white font-bold"
                      : "text-space-light-gray"
                  } cursor-pointer`}
                  onClick={() => setProposalType(3)}
                >
                  All
                </p>
                <p
                  className={`${
                    proposalType === 0
                      ? "text-white font-bold"
                      : "text-space-light-gray "
                  } cursor-pointer`}
                  onClick={() => setProposalType(0)}
                >
                  Core
                </p>
                <p
                  className={`${
                    proposalType === 1
                      ? "text-white font-bold"
                      : "text-space-light-gray"
                  } cursor-pointer`}
                  onClick={() => setProposalType(1)}
                >
                  Community
                </p>
              </div>
              <select
                className="rounded-full bg-none border border-white py-2 md:py-3.5 px-2.5 md:px-5 bg-transparent focus:outline-none "
                onChange={(e) =>
                  setProposalState(e.target.value as ProposalState)
                }
                value={proposalState}
              >
                <option value={ProposalState.ONGOING}>Vote now</option>
                <option value={ProposalState.PENDING}>Soon</option>
                <option value={ProposalState.ENDED}>Ended</option>
              </select>
            </div>

            <ProposalsTable
              proposals={proposals}
              state={proposalState}
              type={proposalType}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Voting;
