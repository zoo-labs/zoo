import React, { useState, useEffect } from "react";
import Article from "components/blog/articles";
import Image from "next/image";

// animation
import { fadeInOnScroll } from "animation";

const articles = [
  {
    name: "Introducing - Zoo Labs: Wildlife Conservation Powered by DeFi",
    image: "/img/blog-post-1.png",
    link: "https://zoolabsofficial.medium.com/introducing-zoo-labs-wildlife-conservation-powered-by-defi-67eacef5a07",
    date: "Jan 6, 2022",
  },
  {
    name: "NFT: The Most Misunderstood 3 Letters in Decentralized Finance",
    image: "/img/blog-post-2.png",
    link: "https://zoolabsofficial.medium.com/nft-the-most-misunderstood-3-letters-in-decentralized-finance-c901ba7f94eb",
    date: "Jan 27, 2022",
  },
];

const Blog = () => {
  const [category, setCategory] = useState(0);
  const blogHeaderRef = React.useRef();

  useEffect(() => {
    fadeInOnScroll(blogHeaderRef.current);
  }, []);

  return (
    <>
      {/* Hero Section*/}
      <div className="pt-16 pb-16 px-6 lg:max-w-7xl lg:mx-auto">
        <div
          className="flex items-center text-center flex-col"
          ref={blogHeaderRef}
        >
          <p className="text-5xl lg:text-7xl text-white font-bold mb-6">
            ZOO Blog
          </p>
          <p className="w-96 mb-20">
            Wildlife Conservation powered by DeFi — Zoo Labs’ 3D/AR NFTS are
            cutting edge &amp; our liquidity protocol/multi-chain bridge will
            change the game as we know it.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xl mx-auto lg:flex-row lg:items-stretch lg:max-w-5xl">
          <div className="overflow-hidden rounded-2xl lg:basis-1/2">
            <Image src="/img/story-image.png" width={565} height={516} alt="" />
          </div>
          <div className="flex flex-col justify-center w-full lg:basis-1/2 bg-deep-gray rounded-2xl lg:-ml-2 -mt-3 lg:-mt-0">
            <div className="max-w-sm mx-auto py-8 lg:py-0 px-4 lg:px-0">
              <p className="bg-blue text-white px-2 py-1 mb-6 inline-block text-xs font-bold uppercase rounded-sm">
                New
              </p>
              <h2 className="mb-3 text-2xl lg:text-3xl font-bold">
                Stories From Our Community: Kohaku &amp; Moyo Shiro
              </h2>
              <p className="mb-6">
                How the ZOO foundation helped save over 100,000 acres of
                elephant habitat to date.{" "}
              </p>
              <a
                className="bg-gradient-to-b from-purple to-blue text-white  text-sm md:text-base font-bold px-8 py-3 md:px-6 lg:px-16 rounded-full"
                href="https://zoolabsofficial.medium.com/"
                target="_blank"
                rel="noreferrer"
              >
                Read full story
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="pt-16 pb-8 px-6 md:flex-col md:items-center lg:flex-row lg:max-w-7xl lg:mx-auto ">
        <div className="flex justify-center">
          <div
            className="flex lg:grid lg:grid-cols-3 border-blue w-auto  mb-8 border rounded overflow-hidden lg:w-1/3"
            style={{ top: 10 }}
          >
            {["All", "News", "Zoo Guide"].map((value, index) => {
              const active = category === index;
              return (
                <a
                  onClick={() => {
                    setCategory(index);
                  }}
                  className={`${
                    active ? "bg-blue text-white" : "text-gray-400"
                  } text-sm font-bold py-4 px-6 cursor-pointer inline-block border text-center border-blue`}
                  key={index}
                >
                  {value}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Articles Map */}
      <section className="pb-16 px-6 lg:max-w-7xl lg:mx-auto ">
        <div className="flex flex-col mb-16 lg:grid lg:grid-cols-3 md:grid-cols-1 md:place-items-center lg:place-items-stretch lg:gap-12 ">
          {articles.map((article) => (
            <Article article={article} key={article.name} />
          ))}
        </div>
        <div className="flex justify-center">
          <a
            href="https://zoolabsofficial.medium.com/"
            target="_blank"
            rel="noreferrer"
            className="border border-green text-green text-sm md:text-base font-bold px-8 py-3 md:px-6 lg:px-16 rounded-full hover:cursor-pointer"
          >
            See all
          </a>
        </div>
      </section>
    </>
  );
};

export default Blog;