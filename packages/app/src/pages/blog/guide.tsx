import Image from "next/image";
import Link from "next/link";

import { XIcon } from "@heroicons/react/outline";
import Copy from "components/AccountDetails/Copy";
import Typography from "components/Typography";

const CopyText = ({ text }) => {
  return (
    <div className="px-3mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="pr-4 sm:text-center">
        <span className="block text-white sm:ml-2 sm:inline-block">
          <Copy
            className="flex flex-col text-center text-white lg:flex-row"
            toCopy={text}
          >
            <Typography variant="lg" className="font-bold text-white underline">
              {text}
            </Typography>
          </Copy>
        </span>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:pt-1 sm:pr-2 sm:items-start"></div>
    </div>
  );
};

const Guide = () => {
  return (
    <>
      <div className="pt-16 pb-16 px-6 lg:max-w-7xl lg:mx-auto">
        {/* Zoo Intro*/}
        <div className="flex flex-row justify-between py-12">
          <div className="lg:basis-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 mt-12 lg:mt-0">
              How to claim your free $ZOO{" "}
            </h1>
            <nav className="flex gap-12 text-sm lg:text-lg uppercase mb-8">
              <Link href="/blog">
                <a>Blog &gt;&gt;</a>
              </Link>
              <Link href="/blog">
                <a>Blog Guides &gt;&gt;</a>
              </Link>
              <a>How To Claim Your Free $ZOO</a>
            </nav>
            <div className="mb-20">
              <p className="text-grey text-xl mb-8">
                When we first launched our token in September we airdropped 50%
                of the total v4 token supply to all V2 holders. There are still
                many users that never added the new $ZOO token address into
                their BSC Mainnet Wallet. If you {`haven’t`} already added the
                new V4 $ZOO token you can still claim your free V4 token.
                Everyone who owned the V2 token was sent a 1:1 in value of the
                current token. Follow the guide below to find out what your $ZOO
                balance is worth today!
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-8">
                TOP 3 Binance Smart Chain compatible wallets Set-Up-Tutorials
              </h2>
              <p className="mb-6 text-xl">
                1. Metamask{" "}
                <span>
                  <Image
                    src="/images/wallets/metamask.png"
                    width={16}
                    height={16}
                    alt=""
                  />
                </span>
              </p>
              <p className="mb-6 text-xl">
                2. Binance Chain{" "}
                <span>
                  <Image
                    src="/images/wallets/bsc.jpg"
                    width={16}
                    height={16}
                    alt=""
                  />
                </span>
                <a href="#binance" className="ml-8 underline text-sm">
                  skip to tutorial
                </a>
              </p>
              <p className="mb-6 text-xl">
                3. Trust Wallet{" "}
                <span>
                  <Image
                    src="/images/wallets/wallet-connect.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                </span>
                <a href="#trustwallet" className="ml-8 underline text-sm">
                  skip to tutorial
                </a>
              </p>
            </div>
          </div>
          {/* Zoo free images */}
          <div className="invisible lg:visible lg:block basis-1/2 flex flex-col justify-center items-center">
            <div className="mb-16">
              <Image
                src="/img/zoo-free.png"
                width={300}
                height={250}
                objectFit="contain"
                alt=""
              />
            </div>
            <div>
              <Image
                src="/img/zoo-free.png"
                width={300}
                height={250}
                objectFit="contain"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {/** Meta Mask guide */}
      <div className="py-16 bg-green mb-16">
        <div className="px-6 lg:max-w-7xl lg:mx-auto flex items-center">
          <div className="w-16 h-16 bg-blue flex justify-center items-center rounded mr-8">
            <Image
              src="/images/wallets/metamask.png"
              width={32}
              height={32}
              alt=""
            />
          </div>
          <h2 className="text-2xl lg:text-4xl text-blue">Add $ZOO on Metamask</h2>
        </div>
      </div>
      <div className="py-8 lg:py-16 flex gap-12 justify-center">
        <Image
          src="/img/guide-1.png"
          width={573}
          height={727}
          objectFit="contain"
          alt=""
        />

        <Image
          src="/img/guide-2.svg"
          width={573}
          height={727}
          objectFit="contain"
          alt=""
        />
      </div>
      <div className="py-16 bg-black100">
        <div className="px-6 lg:max-w-7xl lg:mx-auto">
          <p className="text-xl">
            Download Metamask and check the network list. Click the top of the
            page where it says “Wallet” you will also see Ethereum Main Network.
            Click this to see the list of networks. As you can see BSC Mainnet
            is not yet included so you will have to add it manually, now click
            the three horizontal bars, then click settings (image 2.){" "}
          </p>
        </div>
      </div>
      <div className="py-16 flex gap-12 justify-center">
        <div className="">
          <Image
            src="/img/guide-3.png"
            width={1200}
            height={600}
            alt=""
            objectFit="contain"
          />
        </div>
      </div>
      <div className="py-16 bg-black100 mb-16">
        <div className="px-6 lg:max-w-7xl lg:mx-auto">
          <p className="text-xl mb-8">
            Click “New Network” or “Custom RPC.” Then paste in each correct
            input as instructions indicate:{" "}
          </p>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Network Name, paste
            </p>
            <CopyText text="Smart Chain" />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              New RPC URL, paste
            </p>
            <CopyText text="https://bsc-dataseed.binance.org/" />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Chain ID, paste
            </p>
            <CopyText text="56" />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Currency Symbol, paste
            </p>
            <CopyText text="BNB" />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Block Explorer URL, paste
            </p>
            <CopyText text="https://bscscan.com" />
          </div>
        </div>
      </div>
      <div className="py-16 flex gap-12 justify-center">
        <div className="">
          <Image
            src="/img/guide-4.png"
            width={1200}
            height={600}
            alt=""
            objectFit="contain"
          />
        </div>
      </div>

      <div className="py-16 px-4 bg-black100">
        <div className="px-6 lg:max-w-7xl lg:mx-auto">
          <p className="text-xl mb-8">
            Click Wallet to change to Binance Smart Chain. Click “import tokens”
            then fill in the custom token form as follows:{" "}
          </p>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex items-center">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Token Address, paste
            </p>
            <CopyText text="0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13" />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Token Symbol/ Name, paste ZOO
            </p>
            <CopyText text="ZOO" />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Token of Precision, paste
            </p>
            <CopyText text="18" />
          </div>
          <p className="text-xl">
            After you fill form correctly, click “import.” Please allow for a
            few minutes to load balance properly.
          </p>
        </div>
      </div>
      {/** Guide Binance */}
      <div className="py-16 bg-green" id="binance">
        <div className="px-6 lg:max-w-7xl lg:mx-auto  flex items-center">
          <div className="w-16 h-16 bg-blue flex justify-center items-center rounded mr-8">
            <Image
              src="/images/wallets/bsc.jpg"
              width={32}
              height={32}
              alt=""
            />
          </div>
          <h2 className="text-2xl lg:text-4xl text-blue">
            Add $ZOO on Binance Chain Wallet
          </h2>
        </div>
      </div>
      <div className="py-16 flex gap-12 justify-center">
        <div className="">
          <Image
            src="/img/guide-5.png"
            width={573}
            height={600}
            alt=""
            objectFit="contain"
          />
        </div>
      </div>
      <div className="py-16 bg-black100">
        <div className="px-6 lg:max-w-7xl lg:mx-auto">
          <p className="text-xl mb-6">
            Open Extension wallet and click Assets to see the tokens in your
            wallet. Scroll down to the bottom and click “+”. Click “+” on the
            right corner and put in the correct inputs as follows:
          </p>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex items-center">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Token Address, paste
            </p>
            <CopyText text="0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13" />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Token Symbol/ Name, paste ZOO
            </p>
            <CopyText text="ZOO" />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Token of Precision, paste
            </p>
            <CopyText text="18" />
          </div>
          <p className="text-xl">
            After you fill form correctly, click “Add asset.” Please allow for
            few minutes to load balance properly.
          </p>
        </div>
      </div>

      {/** Trust Wallet Guide */}
      <div className="py-16 bg-green mb-16" id="trustwallet">
        <div className="px-6 lg:max-w-7xl lg:mx-auto flex items-center">
          <div className="w-16 h-16 bg-blue flex justify-center items-center rounded mr-8">
            <Image
              src="/images/wallets/wallet-connect.svg"
              width={32}
              height={32}
              alt=""
            />
          </div>
          <h2 className="text-2xl lg:text-4xl text-blue">Add $ZOO on Trust Wallet</h2>
        </div>
      </div>
      <div className="py-8 lg:py-16 flex gap-12 justify-center">
        <div className="">
          <Image
            src="/img/guide-6.png"
            width={1200}
            height={600}
            alt=""
            objectFit="contain"
          />
        </div>
      </div>
      <div className="py-16 bg-black100 mb-16">
        <div className="px-6 lg:max-w-7xl lg:mx-auto">
          <p className="text-xl mb-8">
            Open Trust Wallet and tap on the filter icon
          </p>
          <p className="text-xl mb-8">Click “add custom token”</p>
          <p className="text-xl mb-8">
            Next, provide the network, contract address, name, symbol, decimals,
            and tap on “Save”. Please allow for few minutes to load balance
            properly.
          </p>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Token Address, paste
            </p>
            <CopyText text="0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13" />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Token Symbol/Name, paste ZOO
            </p>
            <CopyText text="ZOO" />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-row text-lg mb-6">
            <p className="flex ">
              <span className="block w-6 h-6 rounded-full mr-4 bg-blue" />
              Token of Precision, paste
            </p>
            <CopyText text="18" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Guide;
