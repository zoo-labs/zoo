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
import {
  ApprovalState,
  useVotingApproveCallback,
} from "hooks/useApproveCallback";
import { ChainId } from "constants/chainIds";
import BlockIcon from "@mui/icons-material/Block";
import * as sanitizeHtml from "sanitize-html";
import { useZooVoting } from "hooks";

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
  const zooVotingContract = useZooVoting();
  const [approvalState, approve] = useVotingApproveCallback(
    50,
    zooVotingContract?.address
  );

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
    <div className="dao-bg w-full Home flex flex-col  min-h-[70vh]">
      <div className="w-full px-4 py-16 mx-auto lg:max-w-6xl">
        <a
          onClick={goBack}
          className="flex items-center justify-start mb-3.5 text-left cursor-pointer"
        >
          <Image src="/icons/arrow-left.svg" alt="" height={12} width={16} />
          <span className="text-xs font-light md:text-sm ml-3">Back</span>
        </a>
        <p className="mb-6 text-2xl font-semibold md:text-4xl">
          Create New Proposal
        </p>
        <div className="flex flex-col md:flex-row md:items-start gap-7 bg-white-10 backdrop-blur-[100px] py-6 px-8 rounded-[20px]">
          <div className="w-full md:w-3/5">
            <div className="w-full mb-4">
              <p className="mb-2 text-sm font-light md:text-sm md:mb-2.5">
                Title
              </p>
              <input
                className="w-full p-4 bg-transparent rounded-2xl focus:outline-none border border-white-10"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="w-full mb-4">
              <p className="mb-1.5 text-lg font-light md:text-sm md:mb-2.5">
                Description (Optional)
              </p>
              <DefaultEditor
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                style={{
                  height: 209,
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                className="w-full p-4 text-white border-none bg-transparent focus:outline-none"
              />
            </div>

            <div className="w-full mb-1.5 border rounded-3xl border-white-10">
              <div className="px-5 py-6 md:px-7">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm mb-2.5 font-medium">Start date</p>
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
                            className="w-full px-5 py-4 text-base text-white uppercase rounded-xl bg-transparent border border-white-10 placeholder:text-butter placeholder:text-base focus:outline-none hover:outline-none placeholder:uppercase"
                            placeholder="DD/MM/YYYY"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: 3,
                                "&:hover": {
                                  outline: "none",
                                },
                                "&:focus": {
                                  outline: "none",
                                },
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                            }}
                            inputProps={{
                              ...params.inputProps,
                              style: {
                                color: "#939393",
                                fontSize: "1rem",
                                padding: "1rem 1.25rem",
                                outline: "none",
                                border: "red",
                                // borderRadius: 12,
                              },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  <div>
                    <p className="text-sm mb-2.5 font-medium">Start time</p>
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
                            className="w-full px-5 py-4 text-white uppercase rounded-xl bg-transparent placeholder:text-butter focus:outline-none placeholder:uppercase"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: 3,
                                "&:hover": {
                                  outline: "none",
                                },
                                "&:focus": {
                                  outline: "none",
                                },
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                            }}
                            inputProps={{
                              ...params.inputProps,
                              style: {
                                color: "#939393",
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
                  <div>
                    <p className="text-sm mb-2.5 font-medium">End date</p>
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
                            className="w-full px-5 py-4 text-white uppercase rounded-xl bg-transparent placeholder:text-butter focus:outline-none placeholder:uppercase"
                            placeholder="DD/MM/YYYY"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: 3,
                                "&:hover": {
                                  outline: "none",
                                },
                                "&:focus": {
                                  outline: "none",
                                },
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                            }}
                            inputProps={{
                              ...params.inputProps,
                              style: {
                                color: "#939393",
                                fontSize: "1rem",
                                padding: "1rem 1.25rem",
                              },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  <div>
                    <p className="text-sm mb-2.5 font-medium">End time</p>
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
                            className="w-full px-5 py-4 text-white uppercase rounded-xl bg-transparent placeholder:text-butter focus:outline-none placeholder:uppercase"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: 3,
                                "&:hover": {
                                  outline: "none",
                                },
                                "&:focus": {
                                  outline: "none",
                                },
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                            }}
                            inputProps={{
                              ...params.inputProps,
                              style: {
                                color: "#939393",
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
                </div>
              </div>
            </div>
            {account && (
              <a
                href={`https://rinkeby.etherscan.io/block/${blockNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 text-butter"
              >
                Snapshot{" "}
                <span className="inline-flex items-center gap-3 font-medium text-zoo-green">
                  {" "}
                  {blockNumber}
                  <Image src="/icons/link.svg" alt="" height={13} width={13} />
                </span>
              </a>
            )}
          </div>
          <div className="w-full md:w-2/5 pt-7">
            <div className="w-full border rounded-3xl border-white-10 bg-transparent p-5 mb-7">
              <button
                disabled={loading}
                className="w-full rounded-full bg-bid-gradient p-px mb-4 hidden"
              >
                <p className="py-4 w-full rounded-full bg-grey">
                  <p
                    className="text-sm font-light "
                    // style={{ textFillColor: "transparent" }}
                  >
                    Preview
                  </p>
                </p>
              </button>
              {[ApprovalState.NOT_APPROVED, ApprovalState.UNKNOWN].includes(
                approvalState
              ) ? (
                <button
                  type="button"
                  className="w-full px-12 py-3 text-lg text-center text-white transition duration-200 ease-in rounded-full shadow-md bg-space-gray-100 hover:bg-indigo-700 focus:ring-offset-indigo-200 focus:outline-none focus:ring-offset-2"
                  onClick={approve}
                >
                  Approve
                </button>
              ) : (
                <button
                  disabled={loading}
                  className="w-full text-sm font-light py-4 rounded-full bg-bid-gradient"
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
                    "Submit"
                  ) : (
                    "Connect wallet"
                  )}
                </button>
              )}
            </div>
            <div className="w-full border rounded-3xl border-white-10 bg-transparent">
              <p className="flex items-center justify-between w-full pt-6 text-lg font-semibold bg-space-grey px-4 md:px-5 rounded-t-3xl md:text-sm">
                Choices
              </p>
              <div className="px-4 py-5 md:px-5">
                <p className="text-[#939393] w-full px-5 py-4 mb-6 font-medium rounded-xl bg-transparent border border-white-10">
                  Approve
                </p>
                <p className="text-[#939393] w-full px-5 py-4 mb-6 font-medium rounded-xl bg-transparent border border-white-10">
                  Disapprove
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeProposals;
