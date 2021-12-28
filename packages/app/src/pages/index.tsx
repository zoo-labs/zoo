import { nanoid } from "@reduxjs/toolkit";
import { GetStaticProps } from "next";
import Head from "next/head";
import Home from "./Home";

export default function Dashboard(props) {
  return (
    <div>
      <Head>
        <title>ZOO</title>
        <meta name="description" content="ZOO" />
      </Head>
      <Home />
    </div>
  );
}
