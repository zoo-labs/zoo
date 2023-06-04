import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useActiveWeb3React } from "hooks";
import Slider from "react-slick";
import Web3Status from "../../components/Web3Status";

// animation
import { fadeInOnScroll } from "animation";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import axios from "axios";

const MarketPlaceSection = ({ slideData }) => {
  const { account, chainId, library } = useActiveWeb3React();
  const [Form, setForm] = useState({
    email: "",
  });

  const [succes, setSucces] = useState(false);
  const [error, seterror] = useState(false);
  const [sliderRef, setSliderRef] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
      <div className=" bg-[#000]">
        <div className="md:w-4/5 mx-auto">
          <div className="flex flex-col-reverse items-start px-6 mx-auto pb-16 lg:py-8 lg:h-[438px] overflow-y-hidden lg:flex-row-reverse max-w-7xl">
            <div className="relative z-30 flex flex-col mb-8 lg:basis-1/2">
              <div className="flex lg:justify-end">
                <div className="lg:w-3/4 text-[#A6A6A6]">
                  <div className="border-[#6D7278] text-[#6D7278] border-b-[2px] pb-3 flex w-full"></div>
                  <div className="border-[#6D7278] text-[#6D7278] border-b-[2px] pb-4 flex items-center w-full mt-8">
                    <div className="w-2/5 text-4xl font-semibold">16,000+</div>
                    <div className="w-3/5 text-lg flex justify-end md:justify-start ">
                      <p className="w-5/6 text-[#A4A7AE]">
                        endangered species threatened with extinction
                      </p>
                    </div>
                  </div>
                  <div className="border-[#6D7278] text-[#6D7278] border-b-[2px] pb-4 flex items-center w-full mt-8">
                    <div className="w-2/5 text-4xl font-semibold">82%</div>
                    <div className="w-3/5 text-lg flex justify-end md:justify-start">
                      <p className="w-5/6 text-[#A4A7AE]">
                        of spending dedicated to conservation
                      </p>
                    </div>
                  </div>
                  <div className="border-[#6D7278] text-[#6D7278] border-b-[2px] pb-4 flex items-center w-full mt-8">
                    <div className="w-2/5 text-4xl font-semibold">100%</div>
                    <div className="w-3/5 text-lg flex justify-end md:justify-start">
                      <p className="w-5/6 text-[#A4A7AE] ">controlled by members of Zoo DAO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-start lg:justify-center basis-1/2 lg:max-w-lg lg:mx-auto h-full">
              <h2 className="mt-16 lg:mt-0 mb-8 text-4xl font-semibold text-center lg:text-5xl lg:text-left text-[#A6A6A6]">
                We love animals.
              </h2>
              <p className="text-sm sm:text-base mt-4 text-[#A6A6A6] mb-24 sm:mt-0 sm:mb-8 text-left">
                The Zoo Labs Foundation is dedicated to saving and preserving
                endangered species. Our 501c3 is controlled by the Zoo DAO and
                allocates a portion of its liquidity to supporting animals in
                real life! The foundation will begin supporting the species of animals we
                have created NFTs of, the Zoo Animals. By participating in the Zoo ecosystem you are 
                also aiding in the efforts to save endangered species in the real world.
                Contribute further by having a top-ranked "Zoo", making a donation, or joining our
                DAO.
              </p>
              <div className="grid grid-cols-2 w-full gap-4 mb-8 md:m">
                <div className="px-2 lg:px-6 py-3 text-[16px] font-semibold bg-[#A6A6A6] text-[#000000] flex items-center justify-between rounded-full md:text-lg w-full hover:cursor-pointer">
                  <Link
                    href="/partnerships"
                    className="flex items-center justify-between w-full"
                    legacyBehavior>
                    <span className="mr-2">Donate Now</span>
                    <Image
                      src="/icons/forward-arrow-black.svg"
                      width={32}
                      height={32}
                      alt=""
                    />

                  </Link> 
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
      </div>
      <div className="px-6 mx-auto pb-16 lg:pb-28 lg:pt-14 max-w-7xl text-center flex flex-col items-center">
        <p className="font-semibold text-3xl md:text-5xl text-white mb-1 mt-8">
          Resources for Getting Started
        </p>
        <div className="mt-16">
          { <div className="flex gap-6 oveflow-x-auto ">
            {slideData &&
              slideData.map((_, i) => (
                <Slider ref={setSliderRef} {...settings} key={i} className="">
                  <div className=" bg-gray-100 rounded-xl">
                    <div className="flex justify-between mb-8 h-full w-full ">
                      <div className="w-full h-[220px] rounded-xl">
                        <img
                          src={_.icon}
                          className="object-cover object-center w-full h-full rounded-t-xl"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-8 px-4">
                      <p className="font-semibold">Quantity</p>
                    </div>
                  </div>
                </Slider>
              ))}
          </div> }
        </div>
      </div>
    </section>
  );
};

export default MarketPlaceSection;
