import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useBlockNumber,
  useWalletModalToggle,
} from "../../state/application/hooks";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { useRouter } from "next/router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { DefaultEditor } from "react-simple-wysiwyg";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
// import { useGetVotingPower } from "hooks/useVote";
import { useCreateProposals } from "state/voting/hooks";
import { Proposal } from "types";
import { ApprovalState, useApproveCallback } from "hooks/useApproveCallback";
import { ChainId } from "constants/chainIds";
import BlockIcon from "@mui/icons-material/Block";
import * as sanitizeHtml from "sanitize-html";

const MakeProposals = () => {
  const router = useRouter();
  const goBack = () => router.back();
  const { account, chainId } = useActiveWeb3React();
  const toggleWallet = useWalletModalToggle();
  // const getVotingPower = useGetVotingPower();

  // States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [choices] = useState(["approve", "disapprove"]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [creator, setCreator] = useState("");
  const blockNumber = useBlockNumber();
  const createProposals = useCreateProposals();
  // const [approvalState, approve] = useApproveCallback(50, contract?.address);

  // const proposalLoaderStart = useLoaderStart(ApplicationLoader.PROPOSAL);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setCreator(account);
  }, [account]);

  const resetValues = () => {
    setStartDate(null);
    setEndDate(null);
    setStartTime(null);
    setEndTime(null);
    setTitle("");
    setDescription("");
  };
  return (
    <div className="Home flex flex-col justify-center items-center min-h-[70vh]">
      <div className="w-full px-4 py-16 mx-auto mt-24 lg:max-w-7xl">
        <a
          onClick={goBack}
          className="flex items-center justify-start gap-4 mb-10 text-left"
        >
          <Image src="/icons/arrow-left.svg" alt="" height={30} width={30} />
          <span className="text-xs font-semibold md:text-lg">
            Back to vote overview
          </span>
        </a>
        <div className="flex flex-col md:flex-row md:items-start gap-7">
          <div className="w-full md:w-3/5">
            <p className="mb-8 text-2xl font-semibold md:text-4xl">
              Make a Proposal
            </p>

            <div className="w-full mb-4">
              <p className="mb-3 text-lg font-semibold md:text-2xl md:mb-4">
                Title
              </p>
              <input
                className="w-full p-4 bg-space-grey rounded-2xl focus:outline-none"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="w-full mb-4">
              <p className="mb-3 text-lg font-semibold md:text-2xl md:mb-4">
                Content
              </p>
              <DefaultEditor
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                style={{
                  height: 300,
                  background: "#797979",
                }}
                className="w-full p-4 text-white border-none bg-[#797979] focus:outline-none"
              />
            </div>

            <div className="w-full border rounded-3xl border-space-grey bg-space-dark">
              <div className="flex items-center justify-between w-full py-6 text-lg font-semibold bg-space-grey px-7 md:px-12 rounded-t-3xl md:text-2xl">
                Choices
              </div>
              <div className="px-6 py-5 md:px-12">
                <div className="w-full px-5 py-4 mb-6 font-medium rounded-xl bg-[#797979]">
                  Approve
                </div>
                <div className="w-full px-5 py-4 mb-6 font-medium rounded-xl bg-[#797979]">
                  Disapprove
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <div className="w-full mb-6 border rounded-3xl border-space-grey bg-space-dark">
              <div className="flex items-center justify-between w-full px-6 py-6 text-lg font-semibold bg-space-grey md:px-7 rounded-t-3xl md:text-2xl">
                Actions
              </div>
              <div className="px-5 py-6 md:px-7">
                <div className="mb-4">
                  <p className="text-lg font-medium">Start date</p>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      value={startDate}
                      minDate={new Date()}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                      className="date-picker-input z-[1]"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="w-full px-5 py-4 text-base text-white uppercase rounded-xl bg-[#797979] placeholder:text-butter placeholder:text-base focus:outline-none hover:outline-none placeholder:uppercase"
                          placeholder="DD/MM/YYYY"
                          sx={{
                            zIndex: 1,
                            outline: "none",
                            "&:focus": {
                              outline: "none",
                              border: "none",
                            },
                            "&:hover": {
                              outline: "none",
                              borderColor: "red",
                            },
                            "& .MuiOutlinedInput-input": {
                              border: "none",
                              "&:hover": {
                                outline: "none",
                              },
                              "&:focus": {
                                outline: "none !important",
                              },
                            },
                            "& .MuiOutlinedInput-root": {
                              // "&:hover": {
                              //   outline: "none",
                              // },
                              // "&:focus": {
                              //   outline: "none !important",
                              // },
                            },
                          }}
                          inputProps={{
                            ...params.inputProps,
                            style: {
                              color: "#9497A8",
                              fontSize: "1rem",
                              padding: "1rem 1.25rem",
                              outline: "none",
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">Start time</p>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileTimePicker
                      value={startTime}
                      minTime={new Date()}
                      onChange={(newValue) => {
                        setStartTime(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="00:00"
                          className="w-full px-5 py-4 text-white uppercase rounded-xl bg-[#797979] placeholder:text-butter focus:outline-none placeholder:uppercase"
                          inputProps={{
                            ...params.inputProps,
                            style: {
                              color: "#9497A8",
                              fontSize: "1rem",
                              fontWeight: "400",
                              padding: "1rem 1.5rem",
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">End date</p>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      value={endDate}
                      minDate={new Date()}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="w-full px-5 py-4 text-white uppercase rounded-xl bg-[#797979] placeholder:text-butter focus:outline-none placeholder:uppercase"
                          placeholder="DD/MM/YYYY"
                          inputProps={{
                            ...params.inputProps,
                            style: {
                              color: "#9497A8",
                              fontSize: "1rem",
                              padding: "1rem 1.25rem",
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="mb-5">
                  <p className="text-lg font-medium">End time</p>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileTimePicker
                      value={endTime}
                      onChange={(newValue) => {
                        setEndTime(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="00:00"
                          className="w-full px-5 py-4 text-white uppercase rounded-xl bg-[#797979] placeholder:text-butter focus:outline-none placeholder:uppercase"
                          inputProps={{
                            ...params.inputProps,
                            style: {
                              color: "#9497A8",
                              fontSize: "1rem",
                              fontWeight: "400",
                              padding: "1rem 1.5rem",
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                {account && (
                  <a
                    href={`https://rinkeby.etherscan.io/block/${blockNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-6 text-butter"
                  >
                    Snapshot{" "}
                    <span className="inline-flex items-center gap-3 font-medium text-space-blue-dark">
                      {" "}
                      {blockNumber}
                      <Image
                        src="/icons/link.svg"
                        alt=""
                        height={13}
                        width={13}
                      />
                    </span>
                  </a>
                )}
                {/* {![ChainId.MAINNET, ChainId.RINKEBY].includes(chainId) ? (
                  <button
                    type="button"
                    className="flex items-center w-full px-12 py-3 text-lg text-center text-white transition duration-200 ease-in rounded-full shadow-md bg-space-gray-100 hover:bg-indigo-700 focus:ring-offset-indigo-200 focus:outline-none focus:ring-offset-2 cursor-no-drop"
                  >
                    <BlockIcon />
                    <p className="ml-2">You&apos;re on the wrong network</p>
                  </button>
                ) : [
                    ApprovalState.NOT_APPROVED,
                    ApprovalState.UNKNOWN,
                  ].includes(approvalState) ? (
                  <button
                    type="button"
                    className="w-full px-12 py-3 text-lg text-center text-white transition duration-200 ease-in rounded-full shadow-md bg-space-gray-100 hover:bg-indigo-700 focus:ring-offset-indigo-200 focus:outline-none focus:ring-offset-2"
                    onClick={approve}
                  >
                    Approve
                  </button>
                ) : ( */}
                <button
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-proposal-button"
                  onClick={() => {
                    if (account) {
                      setLoading(true);

                      createProposals(
                        {
                          title,
                          description,
                          endDate,
                          endTime,
                          startDate,
                          startTime,
                          choices,
                          creator,
                        } as Proposal,
                        () => (console.log("dhdhvshgvd"), setLoading(false)),
                        () => {
                          resetValues();
                          setTimeout(() => router.push("/dao"), 1000);
                        }
                      );
                    } else {
                      toggleWallet();
                    }
                  }}
                >
                  {loading ? (
                    <i className="text-white fas fa-circle-notch animate-spin" />
                  ) : account ? (
                    "Make Proposal"
                  ) : (
                    "Connect wallet"
                  )}
                </button>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeProposals;
