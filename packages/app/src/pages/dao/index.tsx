/* eslint-disable @next/next/no-img-element */
import ProposalsTable from "components/Voting/ProposalsTable";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { ProposalState, useGetAllProposals } from "hooks/useVote";
import Head from "next/head";
import { ChainId } from "constants/chainIds";
import DaoLayout from "layouts/Dao";
import { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAddPopup } from "state/application/hooks";

const Voting = ({}: AppProps & {
  Component: NextComponentType<NextPageContext>;
  Layout: (title: string) => void;
}) => {
  const [proposalState, setProposalState] = useState(ProposalState.ONGOING);
  const [proposalType, setProposalType] = useState(3);
  const [_proposals, setProposals] = useState([]);
  const { proposals }: any = useSelector((state: any) => state.voting);
  const addPopup = useAddPopup();
  const getAllProposals = useGetAllProposals();

  const { push } = useRouter();

  useEffect(() => {
    getAllProposals();
  }, [getAllProposals]);

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
        <div className="w-full lg:w-[28%] lg:mr-12 border border-gray-500 p-px rounded-2xl">
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
              {/* <select
                onChange={(e) => setProposalType(Number(e.target.value))}
                className="bg-white-10 py-2.5 px-1 text-sm font-semibold mr-5 rounded-full"
              >
                <option value={3}>All</option>
                <option value={0}>Community</option>
                <option value={1}>Core</option>
              </select> */}
              <FormControl fullWidth sx={{ borderBottom: 0 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={proposalType}
                  variant="filled"
                  onChange={(e) => setProposalType(Number(e.target.value))}
                  className="bg-white-10 py-2.5 px-1 text-sm font-semibold mr-5 rounded-full text-white"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    maxHeight: "46px",
                    borderRadius: "100px",
                    minWidth: "150px",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      opacity: "1",
                    },
                    "&:focus": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      opacity: "1",
                    },
                    "& 	.MuiSelect-filled": {
                      color: "white",
                      fontWeight: 600,
                      fontSize: 14,
                      paddingTop: "8px",
                      "&:focus": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        opacity: "1",
                        borderBottom: "none",
                      },
                    },
                    "& .MuiSelect-icon": {
                      color: "white",
                    },
                    "& .MuiList-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "& .MuiMenu-list": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <MenuItem value={3}>All</MenuItem>
                  <MenuItem value={1}>Community</MenuItem>
                  <MenuItem value={0}>Core</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={proposalState}
                  variant="filled"
                  onChange={(e) =>
                    setProposalState(e.target.value as ProposalState)
                  }
                  className="bg-white-10 py-2.5 px-1 text-sm font-semibold mr-5 rounded-full text-white"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    maxHeight: "46px",
                    borderRadius: "100px",
                    minWidth: "150px",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      opacity: "1",
                    },
                    "&:focus": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      opacity: "1",
                    },
                    "& 	.MuiSelect-filled": {
                      color: "white",
                      fontWeight: 600,
                      fontSize: 14,
                      paddingTop: "8px",
                      "&:focus": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        opacity: "1",
                        borderBottom: "none",
                      },
                    },
                    "& .MuiSelect-icon": {
                      color: "white",
                    },
                  }}
                >
                  <MenuItem value={ProposalState.ONGOING}>Vote now</MenuItem>
                  <MenuItem value={ProposalState.PENDING}>Soon</MenuItem>
                  <MenuItem value={ProposalState.ENDED}>Closed</MenuItem>
                </Select>
              </FormControl>
              <div
                onClick={() =>
                  getAllProposals().then(() => {
                    addPopup({
                      txn: {
                        hash: null,
                        summary: "Successfully fetched proposals",
                        success: true,
                      },
                    });
                  })
                }
                className="cursor-pointer"
              >
                <RefreshIcon />
              </div>
              {/* <select
                onChange={(e) =>
                  setProposalState(e.target.value as ProposalState)
                }
                className="bg-white-10 py-2.5 px-1 text-sm font-semibold rounded-full"
              >
                <option value={ProposalState.ONGOING}>Vote now</option>
                <option value={ProposalState.PENDING}>Soon</option>
                <option value={ProposalState.ENDED}>Closed</option>
              </select> */}
            </div>
          </div>
          {/* {_proposals.map((_, i) => {
            const proposalType = _.proposalType === 0 ? "Community" : "Core";
            // const proposalState = _.proposalState === 0 ? "Ongoing" : "Closed";
            const proposalState = (() => {
              if (_.proposalStatus === 0) {
                return "Soon";
              } else if (_.proposalStatus === 1) {
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
                onClick={() => push(`/dao/${_.id}`)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <p className="text-activeGreen text-sm font-light mr-6">
                      Ends April 20, 2022 | 10:00 AM
                    </p>
                    <div className="text-activeGreen text-[10px] font-light border border-activeGreen py-1 px-2 rounded-full">
                      {proposalType}
                    </div>
                  </div>
                  <div className="text-xs bg-green py-2 px-5 text-white rounded-full">
                    {proposalState}
                  </div>
                </div>
                <p className="text-lg mb-3">{_.title}</p>
                <p className="text-sm max-w-[85%]">{_.description}</p>
              </div>
            );
          })} */}
          <ProposalsTable
            proposals={_proposals}
            state={proposalState}
            type={proposalType}
          />
        </div>
      </div>
    </div>
  );
};

export default Voting;
Voting.Layout = DaoLayout;
