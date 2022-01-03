import Image from "next/image";
import Link from "next/link";
import { ANALYTICS_URL } from "../../constants";
import { ChainId } from "@zoolabs/sdk";
import ExternalLink from "../ExternalLink";
import Polling from "../Polling";
import { t } from "@lingui/macro";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { useLingui } from "@lingui/react";

const Footer = () => {
  const { chainId } = useActiveWeb3React();
  const { i18n } = useLingui();
  return (
    // <footer className="absolute bottom-0 flex items-center justify-between w-screen h-20 p-4 mx-auto text-center text-low-emphesis">
    <footer className="flex-shrink-0 w-full bg-black">
      <div className="border-t border-b py-16 hidden lg:block">
        <div className="flex items-start justify-between px-4 max-w-7xl mx-auto flex-auto">
          <div className="flex justify-between items-start basis-2/3 px-6">
            <Image src="/img/logo.svg" width={80} height={24} alt="Zoo" />
            <div className="flex flex-col">
              <div className="mb-4">
                <Link href="/market">Marketplace</Link>
              </div>
              <div className="mb-2">
                <Link href="/chart">Chart</Link>
              </div>
              <div className="mb-2">
                <Link href="/community">Community</Link>
              </div>
              <div className="mb-2">
                <Link href="/press">Press</Link>
              </div>
              <div className="mb-2">
                <Link href="/learn">Learn</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end basis-1/3 px-6">
            <div className="mb-2">
              <Link href="/">My Profile</Link>
            </div>
            <div className="mb-2">
              <Link href="/">Connect Wallet</Link>
            </div>
            <div className="mb-2">
              <Link href="/">Whitepaper</Link>
            </div>
            <div className="mb-2">
              <Link href="/">FAQ</Link>
            </div>
            <div className="mb-2">
              <Link href="/">Connect us</Link>
            </div>
          </div>
          <div className="flex flex-col items-start basis-2/3 px-6">
            <p className="text-white uppercase font-bold mb-4">Newsletter</p>
            <p className="mb-4 text-white">
              Subscribe to our newsletter to get the first notice on upgrades,
              new features and events!
            </p>
            <form>
              <div className="flex items-center border rounded-full py-2 px-2">
                <input type="email" placeholder="enter your email" className="bg-transparent"/>
                <button type="submit">
                  <Image
                    src="/img/small-circle-button.png"
                    width={24}
                    height={24}
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
      <div className="flex flex-col iterms-center lg:flex-row justify-between items-center max-w-7xl mx-auto px-4 py-6">
        <p className="text-center mb:0 lg:mb-0 lg:text-left">
          Copyright &copy; 2021 ZOO Labs INC. Allrights reserved
        </p>
        <div>
          <a href="https://twitter.com" className="mr-2">
            <Image src="/img/twitter.svg" height={16} width={16} alt="" />{" "}
          </a>
          <a href="https://telegram.org" className="mr-2">
            <Image src="/img/telegram.svg" height={16} width={16} alt="" />{" "}
          </a>
          <a href="https://instagram.com" className="mr-2">
            <Image src="/img/instagram.svg" height={16} width={16} alt="" />{" "}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
