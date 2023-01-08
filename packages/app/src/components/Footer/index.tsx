import Image from "next/image";
import Link from "next/link";
import { ANALYTICS_URL } from "../../constants";
import { ChainId } from "@zoolabs/sdk";
import ExternalLink from "../ExternalLink";
import Polling from "../Polling";
import { t } from "@lingui/macro";
// import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { useLingui } from "@lingui/react";
import { useActiveWeb3React } from "hooks";
import Web3Status from "../Web3Status";
import { useState } from "react";
import axios from "axios";
const Footer = () => {
  const { account, chainId, library } = useActiveWeb3React();
  const { i18n } = useLingui();
  const [Form, setForm] = useState({
    email: "",
  });
  const [succes, setSucces] = useState(false);
  const [error, seterror] = useState(false);

  const handleSubmit = () => {
    console.log("sending information");

    const { email } = Form;

    //call api to send obj

    axios
      .post("/api/subscribe", {
        email: email,
      })
      .then(function (response) {
        setForm({
          email: "Succes!",
        });
        seterror(false);
        setSucces(true);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        seterror(true);
        setForm({
          email: "Error!",
        });
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...Form,
      [name]: value,
    });
  };

  return (
    // <footer className="absolute bottom-0 flex items-center justify-between w-screen h-20 p-4 mx-auto text-center text-low-emphesis">
    <footer className="flex-shrink-0 w-full bg-black">
      <div className="hidden border-t border-b border-grey lg:block">
        <div className="flex items-start justify-between flex-auto px-4 mx-auto max-w-7xl">
          <div className="flex items-start justify-between px-6 py-16 basis-2/3 ">
            <div>
              <Link href="/" passHref>
                <Image
                  src="/img/logo.svg"
                  width={80}
                  height={24}
                  alt="Zoo"
                  className="hover:cursor-pointer"
                />
              </Link>
            </div>
            <div className="flex flex-col text-grey">
              <div className="mb-2">
                <a
                  href="https://bscscan.com/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13#tokenInfo"
                  target="_blank"
                  rel="noreferrer"
                >
                  BSCscan
                </a>
              </div>
              <div className="mb-2">
                <a
                  href="https://coinmarketcap.com/currencies/zoo-labs/"
                  target="_blank"
                  rel="noreferrer"
                >
                  CoinMarketCap
                </a>
              </div>
              <div className="mb-2">
                <a
                  href="https://www.dextools.io/app/bsc/pair-explorer/0x9f011e700fe3bd7004a8701a64517f2dc23f87dd"
                  target="_blank"
                  rel="noreferrer"
                >
                  DEXtools
                </a>
              </div>
              <div className="mb-2">
                <a
                  href="https://www.coingecko.com/en/coins/zoo-labs"
                  target="_blank"
                  rel="noreferrer"
                >
                  CoinGecko
                </a>
              </div>
            </div>
            <div className="flex flex-col text-grey">
              {/* <div className="mb-2">
                <Link href="/market">Marketplace</Link>
              </div> */}
              <div className="mb-2">
                <Link href="/wallet">
                  <a>Marketplace</a>
                </Link>
              </div>
              <div className="mb-2">
                <Link href="/market">
                  <a>Chart</a>
                </Link>
              </div>
              <div className="mb-2">
                <a
                  href="https://prezi.com/i/view/fWOPqU2eZzcqYyVzb5pz"
                  target="_blank"
                  rel="noreferrer"
                >
                  Buy Guide
                </a>
              </div>
              <div className="mb-2">
                <Link href="/about">
                  <a>About</a>
                </Link>
              </div>
              {/* <div className="mb-2">
                <Link href="/community">Community</Link>
              </div> */}
              {/* <div className="mb-2">
                <Link href="/press">Press</Link>
              </div> */}
              {/* <div className="mb-0">
                <Link href="/learn">Learn</Link>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col px-6 p-16 basis-1/3 text-grey h-full">
            {/* <div className="mb-0">
              {!account ? (
                <a href="#">
                  <Web3Status title={i18n._(t`My Profile`)} className="px-0" />
                </a>
              ) : null}
            </div> */}
            {/* <div className="mb-2">
              {!account ? (
                <a href="#">
                  <Web3Status
                    title={i18n._(t`Connect Wallet`)}
                    className="px-0"
                  />
                </a>
              ) : (
                <Link href="/market">Market place</Link>
              )}
            </div> */}
            <div className="mb-2">
              <Link href="https://zoolabs.gitbook.io/whitepaper/introduction/what-is-zoo">
                <a>Whitepaper</a>
              </Link>
            </div>
            <div className="mb-2">
              <Link href="/blog">
                <a>Blogs</a>
              </Link>
            </div>
            <div className="mb-2">
              <Link href="/faqs">
                <a>FAQs</a>
              </Link>
            </div>
            <div className="mb-2">
              <Link href="/animal-list">
                <a>Our Animals</a>
              </Link>
            </div>
            <div className="mb-2">
              <Link href="/partnerships">
                <a>Partnerships</a>
              </Link>
            </div>
            {/* <div className="mb-0">
              <Link href="/">Connect us</Link>
            </div> */}
          </div>
          <div className="flex flex-col items-start px-6 py-16 basis-2/3">
            <p className="mb-4 font-bold text-white uppercase">Newsletter</p>
            <p className="mb-4 text-white text-opacity-70">
              Subscribe to our newsletter to get the first notice on upgrades,
              new features and events!
            </p>
            <form>
              <div className="flex items-center px-2 py-2 border rounded-full">
                <input
                  placeholder="enter your email"
                  name="email"
                  type="email"
                  value={Form.email}
                  onChange={handleInputChange}
                  className="bg-transparent placeholder:text-center"
                />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="flex"
                >
                  <Image
                    src="/img/small-circle-button.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </button>
              </div>
            </form>
          </div>
          {/* {chainId && chainId in ANALYTICS_URL && (
          <ExternalLink
            id={`analytics-nav-link`}
            href={ANALYTICS_URL[chainId] || 'https://analytics.sushi.com'}
            className="text-low-emphesis"
          >
            <div className="flex items-center space-x-2">
              <div>{i18n._(t`Analytics`)}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </ExternalLink>
        )} */}
          {chainId && chainId === ChainId.MATIC && (
            <ExternalLink
              id={`polygon-bridge-link`}
              href="https://wallet.matic.network/bridge/"
              className="text-low-emphesis"
            >
              {i18n._(t`Matic Bridge`)}
            </ExternalLink>
          )}
          {chainId && chainId === ChainId.HARMONY && (
            <ExternalLink
              id={`harmony-bridge-link`}
              href=" https://bridge.harmony.one/tokens"
              className="text-low-emphesis"
            >
              {i18n._(t`Harmony Bridge`)}
            </ExternalLink>
          )}
          {chainId && chainId === ChainId.XDAI && (
            <ExternalLink
              id={`xdai-bridge-link`}
              href=" https://omni.xdaichain.com/"
              className="text-low-emphesis"
            >
              {i18n._(t`xDai Bridge`)}
            </ExternalLink>
          )}

          {chainId && chainId === ChainId.PALM && (
            <ExternalLink
              id={`palm-bridge-link`}
              href=" https://app.palm.io/bridge"
              className="text-low-emphesis"
            >
              {i18n._(t`Palm Bridge`)}
            </ExternalLink>
          )}

          {/* <Polling /> */}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between px-4 py-6 mx-auto iterms-center lg:flex-row max-w-7xl">
        <p className="mb-4 text-center lg:mb-0 lg:text-left text-grey">
          Copyright &copy; {new Date().getFullYear()} ZOO Labs INC. Allrights
          reserved
        </p>
        <div>
          <a
            href="https://mobile.twitter.com/zoo_labs"
            target="_blank"
            rel="noreferrer"
            className="mr-2"
          >
            <Image src="/img/twitter.svg" height={16} width={16} alt="" />{" "}
          </a>
          <a
            href="https://t.me/zooofficial"
            target="_blank"
            rel="noreferrer"
            className="mr-2"
          >
            <Image src="/img/telegram.svg" height={16} width={16} alt="" />{" "}
          </a>
          <a
            href="https://instagram.com/zoolabs.io?utm_medium=copy_link"
            target="_blank"
            rel="noreferrer"
            className="mr-2"
          >
            <Image src="/img/instagram.svg" height={16} width={16} alt="" />{" "}
          </a>
          <a
            href="https://discord.gg/KsXtbu5g"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/img/discord.svg" height={16} width={16} alt="" />{" "}
          </a>
          <a
            href="https://zoolabsofficial.medium.com/"
            target="_blank"
            rel="noreferrer"
            className="ml-2"
          >
            <Image src="/img/medium-icon.svg" height={16} width={16} alt="" />{" "}
          </a>

          <a
            href="https://www.youtube.com/channel/UCjTd-6h0nbVwz34IihdCUww"
            target="_blank"
            rel="noreferrer"
            className="ml-2"
          >
            <Image src="/img/youtube.svg" height={16} width={16} alt="" />{" "}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
