import React, { useState, useEffect } from "react";
import Image from "next/image";

// animation
import { fadeInOnScroll } from "animation";

// components
import Article from "components/blog/articles";
import BlogCards from "components/BlogCards";

const news = [
  {
    name: "Introducing - Zoo Labs: Wildlife Conservation Powered by DeFi",
    image: "/img/zoo.svg",
    link: "https://zoolabsofficial.medium.com/introducing-zoo-labs-wildlife-conservation-powered-by-defi-67eacef5a07",
    date: "Jan 6, 2022",
    writtenBy: 'Lou Di Monaco',
  },
  {
    name: "NFT: The Most Misunderstood 3 Letters in Decentralized Finance",
    image: "/img/introducing.svg",
    link: "https://zoolabsofficial.medium.com/nft-the-most-misunderstood-3-letters-in-decentralized-finance-c901ba7f94eb",
    date: "Jan 27, 2022",
    writtenBy: 'Lou Di Monaco',
  },
];

const guides = [
  {
    name: "How to Buy $ZOO",
    image: "/img/blog-guide-1.png",
    link: "https://prezi.com/i/view/fWOPqU2eZzcqYyVzb5pz",
    date: "Feb 1, 2022",
    writtenBy: 'Lou Di Monaco',
  },
];

const all = [...news, ...guides];

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
          <h1 className="text-5xl lg:text-7xl text-white font-bold mb-6 mt-20 lg:mt-12">
            ZOO Blog
          </h1>
          <p className="w-96 mb-20">
            Learn all about Zoo, our Nfts, and browse through our helpful guides.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xl max-h-[494px] mx-auto lg:flex-row lg:items-stretch lg:max-w-5xl">
          <div className="overflow-hidden rounded-l-2xl lg:basis-1/2">
            <Image
              src="/img/blog-post-1.png"
              width={565}
              height={600}
              alt=""
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col justify-center w-full lg:basis-1/2 bg-deep-gray rounded-r-2xl lg:-ml-2 -mt-3 lg:-mt-0">
            <div className="max-w-sm mx-auto py-8 lg:py-0 px-4 lg:px-0">
              <p className="bg-blue text-white px-2 py-1 mb-6 inline-block text-xs font-bold uppercase rounded-sm">
                New
              </p>
              <h2 className="mb-3 text-2xl lg:text-3xl font-bold">
                Introducing - Zoo Labs: Wildlife Conservation Powered by DeFi
              </h2>
              <p className="mb-12">
                Zoo Labs, a new NFT-based P2E (Play-to-Earn) game that utilizes
                the $ZOO token in its ecosystem, is launching in Q1 of 2022 with
                the mission to aid...
              </p>
              <a
                className="bg-gradient-to-b from-purple to-blue text-white  text-sm md:text-base font-semibold px-8 py-3 md:px-6 lg:px-16 rounded-full"
                href="https://zoolabsofficial.medium.com/introducing-zoo-labs-wildlife-conservation-powered-by-defi-67eacef5a07"
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
      {category === 0 && <BlogCards data={all} />}
      {category === 1 && <BlogCards data={news} />}
      {category === 2 && <BlogCards data={guides} />}

      {/* <section className="pb-16 px-6 lg:max-w-7xl lg:mx-auto ">
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
            className="border border-green text-green text-sm md:text-base font-semibold px-8 py-3 md:px-6 lg:px-16 rounded-full hover:cursor-pointer"
          >
            Our Medium Page
          </a>
        </div>
      </section> */}
    </>
  );
};

export default Blog;
