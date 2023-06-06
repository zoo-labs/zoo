import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next";
import DaoLayout from "../../../../layouts/Dao";

const MakeProposal = dynamic(() => import("../../../../components/Voting/CreateProposal"), {
  ssr: false,
});

const MakeProposals = ({}: AppProps & {
  Component: NextComponentType<NextPageContext>;
  Layout: (title: string) => void;
}) => {
  return (
    <>
      <MakeProposal />
    </>
  );
};

export default MakeProposals;
MakeProposals.Layout = DaoLayout;
