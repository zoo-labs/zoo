import React from "react";
import InstagramIcon from "components/Icons/instagram-icon";

import TwitterIcon from "components/Icons/twitter-icon";

const JoinZooSection = () => {
  return (
    <section className="bg-purple100">
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto max-w-7xl">
        <h2 className="mb-6 text-3xl font-semibold text-center lg:text-5xl">
          Join the ZOO family!
        </h2>
        <p className="mb-4 text-xl">Follow our social media</p>
        <div className="flex items-center mb-6">
          <a
            href="https://mobile.twitter.com/zoo_labs"
            target="_blank"
            rel="noreferrer"
            className="mr-8"
          >
            <TwitterIcon color="white" />
          </a>
          <a
            href="https://instagram.com/zoolabs.io?utm_medium=copy_link"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon color="white" />
          </a>
        </div>

        <form className="">
          <div className="flex flex-row px-4">
            <input
              type="email"
              placeholder="your-email@example.com"
              className="max-w-2xl px-2 py-3 placeholder-white bg-transparent border border-white rounded-tl-lg rounded-bl-lg"
            />
            <button
              type="submit"
              className="px-6 py-3 text-black bg-white border border-white rounded-tr-lg rounded-br-lg"
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JoinZooSection;
