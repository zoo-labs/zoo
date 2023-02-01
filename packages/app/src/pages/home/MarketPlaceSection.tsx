import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useActiveWeb3React } from "hooks";
import Web3Status from "../../components/Web3Status";

// animation
import { fadeInOnScroll } from "animation";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import axios from "axios";

const MarketPlaceSection = () => {
  const { account, chainId, library } = useActiveWeb3React();
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

  // const marketRef = useRef();

  // useEffect(() => {
  //   fadeInOnScroll(marketRef.current);
  // }, []);

  return (
    <section className="w-full mt-28">
      <div className="px-6 mx-auto pb-16 lg:pb-28 lg:pt-14 max-w-7xl text-center flex flex-col items-center">
        <p className="font-semibold text-3xl md:text-6xl text-white mb-1">
          Join the ZOO family!
        </p>
        <p className="text-base md:text-2xl text-butter-white mb-6 font-normal">
          Follow our social media
        </p>
        <div className="flex items-center mb-2">
          <a
            href="https://mobile.twitter.com/zoo_labs"
            target="_blank"
            rel="noreferrer"
            className="mr-10"
          >
            <Image src="/icons/twitter.svg" alt="" width={41} height={41} />
          </a>
          <a
            href="https://t.me/zooofficial"
            target="_blank"
            rel="noreferrer"
            className="mr-10"
          >
            <Image src="/icons/telegram.svg" alt="" width={41} height={41} />
          </a>
          <a
            href="https://www.instagram.com/zoolabs.io/"
            target="_blank"
            rel="noreferrer"
            className="mr-10"
          >
            <Image src="/icons/instagram.svg" alt="" width={41} height={41} />
          </a>
          <a
            href="https://discord.gg/KsXtbu5g"
            target="_blank"
            rel="noreferrer"
            className="mr-10"
          >
            <Image src="/img/discord-large.svg" width={41} height={41} alt="" />
          </a>
          <a
            href="https://zoolabsofficial.medium.com/"
            target="_blank"
            rel="noreferrer"
            className="mr-10"
          >
            <Image src="/img/medium-icon.svg" height={41} width={41} alt="" />{" "}
          </a>
          <a
            href="https://www.youtube.com/channel/UCjTd-6h0nbVwz34IihdCUww"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/img/youtube.svg" width={41} height={41} alt="" />
          </a>
        </div>
        <form>
          <div className="flex items-center px-2 py-2 border rounded-full">
            <input
              placeholder="enter your email"
              name="email"
              type="email"
              value={Form.email}
              onChange={handleInputChange}
              className="bg-transparent px-2 w-full md:w-auto"
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
      <div className="w-full bg-[#000]">
        <div className="flex flex-col items-start px-6 mx-auto pb-16 lg:py-8 lg:h-[438px] overflow-y-hidden lg:flex-row-reverse max-w-7xl">
          <div className="relative z-30 flex mb-8 basis-1/2">
            <video autoPlay loop={true} playsInline={true} muted>
              <source src="https://res.cloudinary.com/diu8hjwwe/video/upload/v1644330487/zoo/phones_nhqvji.mov"></source>
            </video>
          </div>
          <div className="flex flex-col items-center lg:items-start lg:justify-center basis-1/2 lg:max-w-lg lg:mx-auto h-full">
            <h2 className="mb-4 text-4xl font-semibold text-center lg:text-5xl lg:text-left text-[#A6A6A6]">
              We love animals.
            </h2>
            <p className="text-sm sm:text-base mt-4 text-[#A6A6A6] mb-24 sm:mt-0 sm:mb-8 text-left">
              The Zoo Labs Foundation is dedicated to saving and preserving
              endangered species. Our 501c3 is controlled by the Zoo DAO and
              allocates a portion of its liquidity to supporting animals in real
              life! The foundation will begin supporting the animals we hve
              created digital twins of, the Zoo NFT Animals.We need your help by
              playing the Zoo game, making a donation, or joining our DAO.
            </p>
            <div className="grid grid-cols-2 w-full gap-4">
              <div className="px-2 lg:px-6 py-3 text-[16px] font-semibold bg-[#A6A6A6] text-[#000000] flex items-center justify-between rounded-full md:text-lg w-full hover:cursor-pointer">
                <span className="mr-2">Donate Now</span>
                <Image
                  src="/icons/forward-arrow-black.svg"
                  width={32}
                  height={32}
                  alt=""
                />
              </div>
              <div className="px-2 lg:px-6 py-3 text-[16px] font-semibold bg-transparent border border-[#A6A6A6] text-[#A6A6A6] flex items-center justify-between rounded-full w-full md:text-lg md:px-6 hover:cursor-pointer">
                <span className="mr-2">Join Dao</span>
                <Image
                  src="/icons/forward-arrow-gray.svg"
                  width={32}
                  height={32}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPlaceSection;
