import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const MakeProposal = dynamic(() => import("components/Voting/CreateProposal"), {
  ssr: false,
});
const MakeProposals = () => {
  return (
    <>
      <MakeProposal />
    </>
  );
};

export default MakeProposals;
