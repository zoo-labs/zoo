import { ChainId, Currency, NATIVE, SUSHI_ADDRESS } from "@zoolabs/zdk";
import { Feature, featureEnabled } from "../../functions/feature";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { addresses, ANALYTICS_URL } from "../../constants";
import ExternalLink from "../ExternalLink";
import Image from "next/image";
import LanguageSwitch from "../LanguageSwitch";
import Link from "next/link";
import More from "./More";
import Community from "./Learn";
import Learn from "./Community";
import NavLink from "../NavLink";
import { Popover } from "@headlessui/react";
import QuestionHelper from "../QuestionHelper";
import Web3Network from "../Web3Network";
import Web3Status from "../Web3Status";
import { t } from "@lingui/macro";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { useETHBalances } from "../../state/wallet/hooks";
import { useLingui } from "@lingui/react";
import { useZoobalance } from "state/zoo/hooks";
import { metaMask } from "connectors/metaMask";
import { CartItem } from "types/cart";
import { useAppSelector } from "state/hooks";
import { useTheme } from 'next-themes'
import CartSideNav from "components/CartSideNav";
import ThemeSwitcher from './ThemeSwitcher'
import NetworkModal from "modals/NetworkModal";
import NetworkPopup from "modals/NetworkPopup";
import { useNetworkModalToggle } from "state/application/hooks";
import { BackpackRounded } from "@mui/icons-material";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import Marketplace from "./MarketPlace";
import Banner from "components/Banner";

function AppBar(props: {
  banner?: boolean;
  isModal?: boolean;
  transparent?: boolean;
  arrowBg?: string;
}): JSX.Element {
  const { i18n } = useLingui();
  const { account, chainId, library, connector } = useActiveWeb3React();
  const getZooBalance = useZoobalance();
  const [showBg, setShowBg] = useState(true);
  const { theme, setTheme } = useTheme()
  const router = useRouter();
  let linkStyle =
    "p-0 text-baseline hover:text-green focus:text-high-emphesis md:p-0 whitespace-nowrap m-0";

  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ""
  ];
  useEffect(() => {
    getZooBalance();
  }, [account]);

  const chainAddresses =
    (addresses[chainId] as any) || (addresses[ChainId.BSC] as any);
  var scrollTrigger = 60;

  // useEffect(() => {
  //   window.onscroll = function () {
  //     // We add pageYOffset for compatibility with IE.
  //     if (
  //       window.scrollY >= scrollTrigger ||
  //       window.pageYOffset >= scrollTrigger
  //     ) {
  //       setShowBg(true);
  //     } else {
  //       setShowBg(false);
  //     }
  //   };
  // }, []);
  return (
    <header
      className={`absoulte flex-shrink-0 w-full ${
        !props.isModal && !props.transparent
          ? " bg-black"
          : `fixed bg-${theme=='dark' ? "black" : "white"}`
      } z-999`}
    >
      {!props.isModal && props.banner && <Banner type="network_migration" />}
      <Popover
        as="nav"
        className={`z-10 w-full bg-transparent ${
          !props.isModal && !props.transparent && "header-border-b"
        }`}
      >
        {({ open }) => (
          <>
            <div
              className={`px-4 py-4 mx-auto max-w-7xl bg-${
                open ? "black" : "transparent"
              } md:bg-transparent`}
            >
              <div className="flex items-center justify-between">
                {props.isModal ? (
                  <div
                    className={`p-3 ${
                      props.arrowBg ?? "bg-black"
                    } rounded-full`}
                  >
                    <ChevronLeftIcon
                      onClick={() => history.back()}
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />{" "}
                  </div>
                ) : (
                  <div className="flex  items-center">
                    <NavLink href="/" activeClassName=''>
                      <div className={`h-full pl-2 cursor-pointer logo w-[70px] flex text-${ theme == 'dark' ? 'white' : 'black'}`}>
                        ZOO
                      </div>
                    </NavLink>
                  </div>
                )}
                {!props.isModal && (
                  <div className="hidden sm:block ">
                    <div className="flex pl-6 space-x-5">
                      <Marketplace />
                      <NavLink href="/drop">
                        <a
                          id={`bridge-nav-link`}
                          className={
                            router.pathname == "/drop"
                              ? `${linkStyle} text-green text-bold`
                              : `${linkStyle} text-white`
                          }
                        >
                          {i18n._(t`Animal Drops`)}
                        </a>
                      </NavLink>
                      <Community />
                      <Learn />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-end">
                  <div className=" text-xs flex flex-row-reverse items-center rounded p-0.5 whitespace-nowrap  font-bold select-none pointer-events-auto">
                    <More />
                    {/* <ThemeSwitcher /> */}
                    <div
                      className={`${
                        account &&
                        `flex flex-row-reverse items-center bg-${theme == 'dark' ? 'black' : 'white'} border border-${theme == 'dark' ? 'white' : 'black'}-20 rounded-[10px] p-1 cursor-pointer`
                      }`}
                    >
                      <Web3Status
                        title={i18n._(t`Connect Wallet`)}
                        className="font-bold bg-black border border-green text-green"
                      />
                      {account && chainId && userEthBalance && (
                        <NetworkPopup {...{ userEthBalance, NATIVE }} />
                      )}
                    </div>
                    <Link href="/wallet" passHref legacyBehavior>
                      <div className={`mr-2 bg-${theme == 'dark' ? 'black' : 'white'} border border-${theme == 'dark' ? 'white' : 'black'}-20 rounded-md cursor-pointer px-2 h-[42px] hidden sm:inline-flex justify-center items-center`}>
                        <svg
                          width="31"
                          height="30"
                          viewBox="0 0 31 30"
                          className="w-5 h-5"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.2326 8.84315H6.07012V8.11665L22.0531 6.83801V8.11665H24.2326V5.93715C24.2326 4.33885 22.938 3.21713 21.3571 3.44235L6.76756 5.52595C5.18525 5.75262 3.89062 7.24485 3.89062 8.84315V23.3731C3.89063 24.1439 4.19679 24.883 4.74177 25.428C5.28675 25.973 6.02591 26.2791 6.79662 26.2791H24.2326C25.0033 26.2791 25.7425 25.973 26.2875 25.428C26.8325 24.883 27.1386 24.1439 27.1386 23.3731V11.7491C27.1386 10.9784 26.8325 10.2393 26.2875 9.6943C25.7425 9.14932 25.0033 8.84315 24.2326 8.84315V8.84315ZM22.0531 19.0229C21.7668 19.0228 21.4833 18.9663 21.2188 18.8566C20.9544 18.747 20.7141 18.5863 20.5117 18.3838C20.3093 18.1813 20.1488 17.9409 20.0393 17.6763C19.9298 17.4118 19.8735 17.1282 19.8736 16.8419C19.8737 16.5556 19.9302 16.2721 20.0399 16.0076C20.1495 15.7432 20.3102 15.5029 20.5127 15.3005C20.7152 15.0981 20.9556 14.9376 21.2202 14.8281C21.4847 14.7186 21.7683 14.6623 22.0546 14.6624C22.6328 14.6626 23.1873 14.8925 23.596 15.3015C24.0048 15.7105 24.2343 16.2651 24.2341 16.8434C24.2339 17.4216 24.004 17.9761 23.595 18.3848C23.186 18.7935 22.6314 19.0231 22.0531 19.0229Z"
                            fill="#888888"
                          />
                        </svg>
                      </div>
                    </Link>
                    <div className="flex items-center justify-between w-full mr-2 space-x-4 sm:justify-end">
                      {chainId &&
                        // [ChainId.MAINNET].includes(chainId) &&
                        connector &&
                        connector === metaMask && (
                          <div className="hidden md:inline-flex">
                            <QuestionHelper
                              text={i18n._(t`Add ZOO to your MetaMask wallet`)}
                            >
                              <div
                                className="hidden p-0.5 rounded-md cursor-pointer sm:inline-flex border border-white-20 bg-black hover:bg-dark-900"
                                onClick={() => {
                                  const tokenAddress =
                                    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
                                    chainAddresses.ZOO;
                                  const tokenSymbol = "ZOO";
                                  const tokenDecimals = 18;
                                  const tokenImage =
                                    window.location.origin + "/img/egg.png";
                                  if (
                                    connector &&
                                    connector === metaMask &&
                                    connector.provider.request
                                  ) {
                                    const params: any = {
                                      type: "ERC20",
                                      options: {
                                        address: tokenAddress,
                                        symbol: tokenSymbol,
                                        decimals: tokenDecimals,
                                        image: tokenImage,
                                      },
                                    };
                                    connector.provider
                                      .request({
                                        method: "wallet_watchAsset",
                                        params,
                                      })
                                      .then((success) => {
                                        if (success) {
                                          console.log(
                                            "Successfully added ZOO to MetaMask"
                                          );
                                        } else {
                                          throw new Error(
                                            "Something went wrong."
                                          );
                                        }
                                      })
                                      .catch(console.error);
                                  }
                                }}
                              >
                                <Image
                                  src="/img/egg.png"
                                  alt="zoo"
                                  width={31}
                                  height={36}
                                  // objectFit="contain"
                                  className="rounded-md"
                                />
                              </div>
                            </QuestionHelper>
                          </div>
                        )}

                      {/* {library && library.provider.isMetaMask && (
                      <div className="hidden sm:inline-block">
                        <Web3Network />
                      </div>
                    )} */}
                    </div>
                  </div>

                  <div className="fixed bottom-0 left-0 z-10 flex flex-row items-center justify-center w-full p-4 lg:w-auto bg-dark-1000 lg:relative lg:p-0 lg:bg-transparent">
                    <CartSideNav />
                  </div>
                  <div className="flex -mr-2 sm:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-white rounded-md hover:text-high-emphesis focus:outline-none">
                      <span className="sr-only">
                        {i18n._(t`Open main menu`)}
                      </span>
                      {open ? (
                        <svg
                          className="block w-6 h-6"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        // <X title="Close" className="block w-6 h-6" aria-hidden="true" />
                        <svg
                          className="block w-6 h-6"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                        // <Burger title="Burger" className="block w-6 h-6" aria-hidden="true" />
                      )}
                    </Popover.Button>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile View Navbar Dropdown */}
            <Popover.Panel className="bg-black sm:hidden">
              <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
                {/* <a
                  id={`marketplace`}
                  className="p-2 tracking-widest text-white text-baseline hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  href="/market"
                >
                  {i18n._(t`Marketplace`)}
                </a> */}
                {/* <a
                  id={`dao`}
                  className="p-2 tracking-widest text-white text-baseline hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  href="/dao"
                >
                  {i18n._(t`Dao`)}
                </a>
                <a
                  id={`bridge`}
                  className="p-2 tracking-widest text-white text-baseline hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  href="/bridge"
                >
                  {i18n._(t`Bridge`)}
                </a> */}
                <a
                  id={`chart`}
                  className="p-2 text-white text-baseline hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  href="https://dex.guru/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13-bsc"
                  target="_blank"
                  rel="noreferrer"
                >
                  {i18n._(t`Chart`)}
                </a>

                {/* <a
                  id={`store`}
                  className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  href="/store"
                  target="_blank"
                  rel="noreferrer"
                >
                  {i18n._(t`Store`)}
                </a> */}

                <Marketplace />

                <Community />

                <Learn />

                {/* <div className="w-auto flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                  {account && chainId && userEthBalance && (
                    <>
                      <div className="px-3 py-2 text-primary text-bold">
                        {userEthBalance?.toFixed(3)}{" "}
                        {NATIVE[chainId]?.symbol || "ETH"}
                      </div>
                    </>
                  )}
                  <Web3Status
                    title={i18n._(t`My Wallet`)}
                    className="font-bold border border-green text-green"
                  />
                </div>

                {chainId && featureEnabled(Feature.LIQUIDITY_MINING, chainId) && (
                  <Link href={"/farm"}>
                    <a
                      id={`farm-nav-link`}
                      className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                    >
                      {" "}
                      {i18n._(t`Farm`)}
                    </a>
                  </Link>
                )}

                {chainId && featureEnabled(Feature.KASHI, chainId) && (
                  <>
                    <Link href={"/lend"}>
                      <a
                        id={`lend-nav-link`}
                        className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                      >
                        {i18n._(t`Lend`)}
                      </a>
                    </Link>

                    <Link href={"/borrow"}>
                      <a
                        id={`borrow-nav-link`}
                        className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                      >
                        {i18n._(t`Borrow`)}
                      </a>
                    </Link>
                  </>
                )}

                {chainId && featureEnabled(Feature.STAKING, chainId) && (
                  <Link href={"/stake"}>
                    <a
                      id={`stake-nav-link`}
                      className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                    >
                      {i18n._(t`Stake`)}
                    </a>
                  </Link>
                )}

                {chainId && featureEnabled(Feature.ANALYTICS, chainId) && (
                  <ExternalLink
                    id={`analytics-nav-link`}
                    href={
                      ANALYTICS_URL[chainId] || "https://analytics.sushi.com"
                    }
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  >
                    {i18n._(t`Analytics`)}
                  </ExternalLink>
                )}
                */}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <NetworkModal />
    </header>
  );
}

export default AppBar;
