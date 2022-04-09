import React from "react";
import Image from "next/image";
import InstagramIcon from "components/Icons/instagram-icon";

import TwitterIcon from "components/Icons/twitter-icon";

const JoinZooSection = () => {
  return (
    <section className="bg-purple100" id="newsletter">
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto max-w-7xl">
        <h2 className="mb-6 text-3xl font-semibold text-center lg:text-5xl">
          Join the ZOO family!
        </h2>
        <p className="mb-4 text-xl">Follow us on social media</p>
        <div className="flex items-center mb-6">
          <a
            href="https://mobile.twitter.com/zoo_labs"
            target="_blank"
            rel="noreferrer"
            className="mr-8"
          >
            <Image src="/img/twitter-large.svg" width={32} height={32} alt="" />
          </a>
          <a
            href="https://t.me/RealZoolabs"
            target="_blank"
            rel="noreferrer"
            className="mr-8"
          >
            <Image
              src="/img/telegram-large.svg"
              width={32}
              height={32}
              alt=""
            />
          </a>
          <a
            href="https://instagram.com/zoolabs.io?utm_medium=copy_link"
            target="_blank"
            rel="noreferrer"
            className="mr-8"
          >
            <Image
              src="/img/instagram-large.svg"
              width={32}
              height={32}
              alt=""
            />
          </a>
          <a
            href="https://discord.gg/wW6Wth6r"
            target="_blank"
            rel="noreferrer"
            className="mr-8"
          >
            <Image src="/img/discord-large.svg" width={32} height={32} alt="" />
          </a>
          <a
            href="https://zoolabsofficial.medium.com/"
            target="_blank"
            rel="noreferrer"
            className="mr-8"
          >
            <Image src="/img/medium-icon.svg" height={32} width={32} alt="" />{" "}
          </a>
          <a
            href="https://www.youtube.com/channel/UCjTd-6h0nbVwz34IihdCUww"
            target="_blank"
            rel="noreferrer"
            className="mr-8"
          >
            <Image src="/img/youtube.svg" width={32} height={32} alt="" />
          </a>
        </div>

        {/* <form className="">
          <div className="flex flex-row px-4">
            <input
              type="email"
              placeholder="your-email@example.com"
              className="max-w-2xl px-2 py-3 placeholder-white bg-transparent border border-white rounded-tl-lg rounded-bl-lg lg:w-80"
            />
            <button
              type="submit"
              className="px-6 py-3 text-black bg-white border border-white rounded-tr-lg rounded-br-lg"
            >
              Join
            </button>
          </div>
        </form> */}
      </div>
    </section>
  );
};

export default JoinZooSection;
