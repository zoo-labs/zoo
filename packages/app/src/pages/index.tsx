import { nanoid } from "@reduxjs/toolkit";
import { GetStaticProps } from "next";
import Head from "next/head";
import { loadTranslation } from "../entities";
import Home from "./home";
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const sessionId = nanoid();

  const messages = await loadTranslation(
    locale,
    sessionId,
    process.env.NODE_ENV === "production"
  );

  return {
    props: {
      messages: { ...messages },
    },
  };
};
export default function Dashboard(props) {
  return (
    <div>
      <Head>
        <title>ZOO</title>
        <meta name="description" content="Lux Town" />
      </Head>
      <Home />
    </div>
  );
}
