import React, { useState } from "react";
import Image from "next/image";

export const faqData = [
  {
    question: "What is ZOO?",
    answer:
      "ZOO is a Liquidity Protocol that exists to bridge tokens and NFTs at the intersection of Defi and gaming. Each of our NFTs (animal or egg) yield our native currency, $ZOO. Each Nft is collateralized by $ZOO, which appreciates over time based on rarity, age and by playing our game.",
  },
  {
    question: "When will the game be released?",
    answer: "ZOO will be released January 2022.",
  },
  {
    question: "How do I get onboarded?",
    answer:
      "Players will be able to get access to the game through our Metamask App as well as ZOO Labs official website.",
  },
  {
    question: "What is the $ZOO token?",
    answer:
      "The $ZOO token is the native currency in the game. It allows token holders to play, invest, use our NFT marketplace and be part of the game.",
  },
  {
    question: "How much does the game cost?",
    answer:
      "To play the game you must buy an NFT from our marketplace. In order to grow your animal you have to feed your animal $ZOO. As you feed your animal your NFT will increase in value and continue growing until it becomes a fully matured animal. So the amount of $ZOO you spend just depends on how many interactions you have and how many NFTs you keep.",
  },

  {
    question: "What are the key game features in ZOO?",
    answer: `Our key features include: growing, breeding, youth elixir (back in time), age freezing.
			<br />
			In the near future we will also launch an app with our ZOO augmented reality game. This apple will load the NFTs in your wallet. With the app you will be able to see your NFT in real time with much more animal engagement including: petting, make the animal roll over, shake animals paw, give animal kiss, receive kiss, feed your animal, and walking with your animal. 
			`,
  },
  {
    question: "Which blockchain will the game be launched on?",
    answer:
      "Currently the game and coin is on the BSC network. Not only do we plan to make the game ethereum compatible, but we also are launching a bridge for all stable coins to easily exchange for $ZOO.",
  },
  {
    question: "Where to buy $ZOO tokens?",
    answer: `Please find the official smart contract address of $ZOO here:
		<span class="font-bold">0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13</span> <br/>
		
		<a href="https://pancakeswap.finance/swap?outputCurrency=$0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13" target="_blank" rel="noreferrer" class="text-green text-underline">https://pancakeswap.finance/swap?outputCurrency=$0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13</a> <br />
		
		 Pancakeswap trading link: <a href="https://pancakeswap.finance/swap" target="_blank" rel="noreferrer" class="text-green text-underline">https://pancakeswap.finance/swap</a>
		`,
  },
  {
    question: "How do I get a ZOO Nft?",
    answer: "You can buy $ZOO directly on our marketplace. ",
  },
  {
    question: "I need help",
    answer: `If you're having difficulty, please join our Discord server and post in the <span class="font-bold">#new-player-help</span> channel and our community will be happy to help!
		In addition, a complete list of guides can be found <a href="https://bit.ly/JihozAxieResources" class="text-green" target="_blank" rel="noreferrer">here</a>.`,
  },
  {
    question: "Where can I interact and meet more members of the community?",
    answer: `Please join our <a href="https://welcome.skymavis.com/regional-servers/" target="_blank" rel="noreferrer" class="text-green text-underline">Discord</a> server where you can meet the rest of the community!
		You can find the rest of our channels <a href="https://linktr.ee/AxieInfinity" target="_blank" rel="noreferrer" class="text-green text-underline">here</a>.`,
  },
  {
    question: "Who created the artwork for ZOO?",
    answer: "",
  },
  {
    question: "What is play to earn?",
    answer: `Play to Earn (P2E) means you can earn cash just by playing the game. In ZOO, this is seen by collecting Egg and Animal NFTs that you can sell for real-world cash.`,
  },
  {
    question: "What is a Wallet?",
    answer: `A wallet is a secure place to store your digital items, whether they be cards, boards, trinkets, Ether or anything else you may come across. Every wallet has a unique wallet ID, and this is the thing that links your digital assets to you. What’s more, they are completely free to set up and own.<br />
		When you purchase anything on the ZOO marketplace the NFTs are stored in your wallet, but only if you have one linked to the game.<br /> 
		We recommend using MetaMask to set up a new wallet or link an existing wallet as it has the best functionality with ZOO. MetaMask is a browser extension that easily allows you to interact with the BSC network. With this extension, you can set up a wallet and link it to ZOO to make purchases, sign in, and store your in-game items`,
  },
  {
    question: "How do I set up a Wallet?",
    answer: `Great question! Here’s a simple guide to help you through the process:<br /><br />
		<ol>
			<li>1. Head to MetaMask.io</li>
			<li>2. Install the plug-in: Install the MetaMask extension for your chosen browser.</li>
			<li>3. Create a wallet: Follow the prompts to “Create a Wallet”. </li>
			<li>4. Connect plug-in: Sign in to the Gods Unchained website  with your Gods Unchained account. The MetaMask plug-in will then appear with a prompt to connect – click “Connect”. </li>
			<li>5. Link wallet: Head to the Manage Wallet section of the Gods Unchained website by clicking on your profile image in the top right. Click the ‘Add Wallet’ button.</li>
		</ol>
		<br />
		It’s important to note that connecting and linking your wallet doesn’t give us any power over your wallet or its contents, it simply shows NFT belong to you so you can play with and sell them. That’s the beauty of true ownership! 
		`,
  },
  {
    question: "How do I buy $ZOO?",
    answer: `
		Buy BNB -> go to pancake swap —-> swap BNB for $ZOO <br /><br />
		How to Buy Binance Coin Summary
		<ol>
		<li>1. Get a Binance coin wallet (Ledger, Coinomi).</li>
		<li>2. Locate your BNB address.</li>
		<li>3. Sign up to Binance.</li>
		<li>4. Buy BNB with another crypto or a credit card.</li>
		<li>5. Go to Pancake swap or another trusted exchange.</li>
		<li>6. Swap BNB for $ZOO use this token address as their are many scammers <span class="font-bold">0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13</span></li>
		</ol>
		`,
  },
];

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion = ({ question, answer }: AccordionProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 border-b border-purple">
      <div
        className="py-4 rounded flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <p className="text-base md:text-2xl font-light">{question}</p>
        <span className="hover:cursor-pointer">
          {open ? (
            <Image src="/img/minus-sign.svg" width={16} height={16} alt="" />
          ) : (
            <Image src="/img/plus-sign.svg" width={16} height={16} alt="" />
          )}
        </span>
      </div>
      {open && (
        <p
          className="px-4 py-4 text-base font-light md:text-lg"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )}
    </div>
  );
};

const Faqs = () => {
  return (
    <div className="">
      <div className="pt-16 pb-16 px-4 lg:max-w-7xl mx-auto">
        <h1 className="text-center text-4xl lg:text-5xl font-bold mb-8">
          Frequently asked questions
        </h1>

        {faqData.map((faq, index) => {
          return (
            <div key={index}>
              <Accordion question={faq.question} answer={faq.answer} />
            </div>
          );
        })}
      </div>

      <div className="pt-16 pb-16 lg:pb-24 px-4 lg:max-w-5xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
          Contact Us
        </h2>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:gap-12">
          <form className="flex flex-col basis-1/2 mb-8 lg:mb-0">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border border-grey p-2 py-3 rounded-md"
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border border-grey p-2 py-3 rounded-md"
              />
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Your Message"
                className="w-full bg-transparent border border-grey p-2 py-3 rounded-md"
              ></textarea>
            </div>
            <div>
              <button className="bg-blue text-white text-center py-3 px-2 w-full rounded-md">
                Send
              </button>
            </div>
          </form>
          <div className="basis-1/2">
            <p className="text-md lg:text-2xl mb-6">
              If you're having difficulty, please join our Discord server and
              post in the #new-player-help channel and our community will be
              happy to help!
            </p>
            <p className="text-md lg:text-2xl">
              In addition, a complete list of guides can be found{" "}
              <a href="/blog" className="text-green">
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
