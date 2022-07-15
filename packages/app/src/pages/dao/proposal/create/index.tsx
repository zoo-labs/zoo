import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const MakeProposal = dynamic(() => import("components/Voting/CreateProposal"), {
  ssr: false,
});
const MakeProposals = () => {
  // const startLoader = useProposalLoaderToggle();

  // useEffect(() => {
  //   startLoader();
  // }, []);
  return (
    <>
      <MakeProposal />
    </>
  );
};

export default MakeProposals;
