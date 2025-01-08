import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Image from "../../components/Image";
import Link from "next/link";
import Main from "../../components/Main";
import NavLink from "../../components/NavLink";
import Popups from "../../components/Popups";
import React from "react";
import kashiLogo from "../../../public/kashi-logo.png";
import { useRouter } from "next/router";

interface LayoutProps {
  left?: React.ReactNode;
  children?: React.ReactNode | React.ReactNode[];
  right?: React.ReactNode;
}

export default function Layout({
  left = undefined,
  children = undefined,
  right = undefined,
}: LayoutProps): React.ReactElement {
  const router = useRouter();
  return (
    <div className="z-0 flex flex-col items-start w-full h-screen">
      <Header />
      <Main isModal={false} children={
        <Container className="px-4 py-4 md:py-8 lg:py-12" maxWidth="7xl"
          children={
            <>
              <div className={`mb-2 grid grid-cols-12 gap-4`}>
                <div className="flex justify-center col-span-12 xl:col-span-3 lg:justify-start">
                  <Link
                    href="/borrow"
                    className="flex justify-center xl:justify-start xl:mx-8"
                    legacyBehavior>

                    <Image src={kashiLogo} alt="Kashi" height={64} width={250} />

                  </Link>
                </div>
                <div className="flex items-end col-span-12 xl:col-span-9">
                  <nav className="flex items-center justify-between w-full">
                    <div className="flex">
                      <NavLink href="/lend"
                        children={
                          <a
                            className={
                              "pl-4 pr-2 sm:pl-8 sm:pr-4 flex items-center font-medium " +
                              (router.pathname.startsWith("/lend")
                                ? "text-high-emphesis"
                                : "text-secondary hover:text-primary")
                            }
                          >
                            <div className="text-base whitespace-nowrap">Lend</div>
                          </a>
                        }
                      >

                      </NavLink>
                      <NavLink href="/borrow"
                        children={
                          <a
                            className={
                              "px-2 sm:px-4 flex items-center font-medium " +
                              (router.pathname.startsWith("/borrow")
                                ? "text-high-emphesis"
                                : "text-secondary hover:text-primary")
                            }
                          >
                            <div className="text-base whitespace-nowrap">Borrow</div>
                          </a>
                        }>
                      </NavLink>

                      <NavLink href="/kashi/create"
                        children={
                          <a
                            className={
                              "px-2 sm:px-4 flex items-center font-medium " +
                              (router.pathname.startsWith("/kashi/create")
                                ? "text-high-emphesis"
                                : "text-secondary hover:text-primary")
                            }
                          >
                            <div className="text-base whitespace-nowrap">Create</div>
                          </a>
                        }
                      >
                      </NavLink>
                    </div>
                    <div className="flex pr-2 sm:pr-4">
                      <NavLink href="/balances"
                        children={
                          <a
                            className={`px-2 sm:px-4 flex justify-end items-center font-medium ${router.pathname === "/balances"
                              ? "text-high-emphesis"
                              : "text-secondary hover:text-primary"
                              }`}
                          >
                            <svg
                              className="mr-2 fill-current"
                              width={24}
                              height={24}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 355.24 205.5"
                            >
                            </svg>
                          </a>
                        }
                      >
                      </NavLink>
                    </div>
                  </nav>
                </div>
              </div>
              <div className={`grid grid-cols-12 gap-4 min-h-1/2`}>
                {left && (
                  <div
                    className={`hidden xl:block xl:col-span-3`}
                    style={{ maxHeight: "40rem" }}
                  >
                    {left}
                  </div>
                )}
                <div
                  className={`col-span-12 ${right ? "lg:col-span-8 xl:col-span-6" : "xl:col-span-9"
                    }`}
                  style={{ minHeight: "40rem" }}
                >
                  <>{children}</>
                </div>
                {right && (
                  <div
                    className="col-span-12 lg:col-span-4 xl:col-span-3"
                    style={{ maxHeight: "40rem" }}
                  >
                    {right}
                  </div>
                )}
              </div></>
          }>

        </Container>
      }>

      </Main>
      <Popups />
      <Footer />
    </div>
  );
}
