/* eslint-disable @next/next/no-img-element */
import ProposalsTable from "components/Voting/ProposalsTable";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { ProposalState } from "hooks/useVote";
import Head from "next/head";
import { ChainId } from "constants/chainIds";
import DaoLayout from "layouts/Dao";
import { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";

const Voting = ({}: AppProps & {
  Component: NextComponentType<NextPageContext>;
  Layout: (title: string) => void;
}) => {
  const [proposalState, setProposalState] = useState(ProposalState.ONGOING);
  const [proposalType, setProposalType] = useState(3);
  const [_proposals, setProposals] = useState([]);
  const { proposals }: any = useSelector((state: any) => state.voting);
  const { chainId, account } = useActiveWeb3React();

  const { push } = useRouter();

  useEffect(() => {
    if (proposals) {
      setProposals(proposals);
    }
  }, [proposals]);

  console.log("voting proposals", proposals, _proposals);

  return (
    <div className="dao-bg w-full">
      <Head>
        <title>ZOO | DAO</title>
      </Head>
      <div className="min-h-screen flex flex-col lg:flex-row lg:items-start lg:justify-between w-full pt-16 max-w-7xl px-6 md:px-10 mx-auto">
        <div className="w-full lg:w-[28%] lg:mr-12 bg-nft-gradient p-px rounded-2xl">
          <div className="dao-bg rounded-2xl h-full py-8">
            <p className="text-center text-4xl font-base mb-2.5 px-6">
              Zoo Voting
            </p>
            <p className="text-center text-sm mb-12 px-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae ut
              dapibus nunc nullam mi elementum tempus
            </p>
            <div className="flex flex-col">
              <Link href="" passHref>
                <a className="px-6 py-3 border-l-2 border-activeGreen text-activeGreen text-lg">
                  Proposals
                </a>
              </Link>
              <Link href="/dao/proposal/create" passHref>
                <a className="px-6 py-3 text-lg">Create Proposal</a>
              </Link>
              <Link href="/dao/about" passHref>
                <a className="px-6 py-3 text-lg">About</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[67%]">
          <div className="flex items-center justify-between mb-8">
            <p className="text-2xl">All Proposal</p>
            <div className="flex items-center">
              <select className="bg-white-10 py-2.5 px-1 text-sm font-semibold mr-5 rounded-full">
                <option value="">All</option>
                <option value="">Community</option>
                <option value="">Core</option>
              </select>
              <select className="bg-white-10 py-2.5 px-1 text-sm font-semibold rounded-full">
                <option value="">Vote now</option>
                <option value="">Soon</option>
                <option value="">Closed</option>
              </select>
            </div>
          </div>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="border border-white-10 rounded-2xl py-6 px-5 mb-10 cursor-pointer"
                style={{
                  backdropFilter: "blur(100px)",
                }}
                onClick={() => push("/dao/1")}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <p className="text-activeGreen text-sm font-light mr-6">
                      Ends April 20, 2022 | 10:00 AM
                    </p>
                    <div className="text-activeGreen text-[10px] font-light border border-activeGreen py-1 px-2 rounded-full">
                      Core
                    </div>
                  </div>
                  <div className="text-xs bg-green py-2 px-5 text-white rounded-full">
                    Vote Now
                  </div>
                </div>
                <p className="text-lg mb-3">
                  Lorem ipsum dolor sit amet, consectetur
                </p>
                <p className="text-sm max-w-[85%]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Varius tincidunt egestas porta tincidunt in. Eros, venenatis
                  et ullamcorper quis diam velit eu. Senectus luctus enim turpis
                  urna. Iaculis a sagittis tincidunt id ac.
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Voting;
Voting.Layout = DaoLayout;
