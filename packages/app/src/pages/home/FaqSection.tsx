import React, { useEffect, useState } from "react";
import Link from "next/link";
// animation
import { fadeInOnScroll } from "animation";
import axios from "axios";
import Image from "next/image";

const FaqSection = () => {
  // const faqsRef = React.useRef();

  // useEffect(() => {
  //   fadeInOnScroll(faqsRef.current);
  // }, []);

  const [Form, setForm] = useState({
    email: "",
  });
  const [succes, setSucces] = useState(false);
  const [error, seterror] = useState(false);

  const handleSubmit = () => {
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

  return (
    <section id="faqs" className="">
      <div className=" border-[#353945] border-t-[1px] border-b-[1px]  mb-8 px-8 grid lg:grid-cols-3">
        <div className="flex justify-between py-16  border-[#353945] border-r-[1px] ">
          <p className="text-3xl font-bold lg:text-[48px] leading-[72px] ml-20">
            ZOO
          </p>
          <div className="grid w-2/4 mt-8 gap-4 font-[500] ">
            <CustomLink title="Marketplace" link={"/"} />
            <CustomLink title="Chart" link={"/"} />
            <CustomLink title="Community" link={"/"} />
            <CustomLink title="Press" link={"/"} />
            <CustomLink title="Learn" link={"/"} />
            <CustomLink title="Marketplace" link={"/"} />
          </div>
        </div>
        <div className="flex  border-[#353945] border-r-[1px] ">
          <div className="h-full my-auto mx-auto flex items-center">
            <div className="grid gap-6 mx-auto text-left font-[500]">
              <CustomLink title="My Profile" link={"/"} />
              <CustomLink title="Connect Wallet" link={"/"} />
              <CustomLink title="Whitepaper" link={"/"} />
              <CustomLink title="FAQ" link={"/"} />
              <CustomLink title="Contact Us" link={"/"} />
            </div>
          </div>
        </div>
        <div className="my-auto">
          <div className="w-2/3 mx-auto font-[500]">
            <p className="uppercase">Newsletter</p>
            <p className="my-8 text-[14px] w-2/3 font-[400]">
              Subscribe to our newsletter to get the first notice on upgrades,
              new features and events!
            </p>
            <form>
              <div
                className={`border-[2px] border-[#353945] rounded-[90px] w-full flex items-center`}
              >
                <input
                  className="h-full py-3 w-full rounded-[90px] bg-transparent px-2 placeholder:text-[#777E91] placeholder:text-[14px] placeholder:font-[400] outline-none"
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  value={Form.email}
                  onChange={handleInputChange}
                />
                <button
                  className="mr-2 flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <Image
                    src="/icons/small-circle.svg"
                    width={40}
                    height={40}
                    alt=""
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className=" max-w-7xl mx-auto flex mt-8 mb-16">
        <div className="flex items-center w-3/4 mx-auto justify-between">
          <p className="text-[12px]">
            Copyright © 2021 ZOO Labs INC. All rights reserved
          </p>
          <div className="flex items-center gap-6 ">
            <CustomIconLink link="/" icon="/icons/instagram_negative.svg" />
            <CustomIconLink link="/" icon="/icons/twitter_negative.svg" />
            <CustomIconLink link="/" icon="/icons/discord_negative.svg" />
            <CustomIconLink link="/" icon="/icons/telegram_negativ.svg" />
            <CustomIconLink link="/" icon="/icons/medium_negative.svg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

const CustomLink = ({ link, title }) => {
  return (
    <Link href={link}>
      <a>{title}</a>
    </Link>
  );
};

const CustomIconLink = ({ link, icon }) => {
  return (
    <Link href={link}>
      <a target={"_blank"} rel="noopenner noreferrer">
        <Image src={icon} width={16} height={16} alt="" />
      </a>
    </Link>
  );
};
