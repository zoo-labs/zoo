import React, { useEffect, useState } from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Link from "next/link";

// animation
import { fadeInOnScroll } from "animation";

import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

const UiSwitch = styled(Switch)(({ theme }) => ({
  width: 74,
  height: 32,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    marginTop: 4,
    padding: 0,
    transform: "translateX(4px)",
    "&.Mui-checked": {
      color: "#323341",
      transform: "translateX(44px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('/static/images/bnb.svg')`,
        height: 20,
        top: "20%",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#323341" : "#323341",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#323341    " : "#fff ",
    width: 24,
    height: 24,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('/ZooLogo.svg')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#323341" : "#323341",
    borderRadius: 20,
  },
}));

const Partnership = () => {
  const partnerRef = React.useRef();

  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    fadeInOnScroll(partnerRef.current);
  }, []);
  return (
    <section>
      <div className="flex flex-row py-8 items-center max-w-7xl mx-auto px-6 ">
        <div className="w-7/12" ref={partnerRef}>
          <h1 className="text-3xl lg:text-6xl mb-8 font-bold mt-10 w-11/12 leading-loose">
            Join the
            <br />
            ZooLabs Foundation’s journey to save the endangered animals.
          </h1>
          <p className="text-left text-[#8A8A8A] text-sm lg:text-lg max-w-5xl">
            Protect mother nature and her species before its too late.
          </p>
        </div>

        <div className="w-5/12">
          <div className="relative w-full h-96 overflow-y-hidden">
            <Image
              src={"/images/sheep.png"}
              width="100%"
              height="100%"
              alt=""
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row py-8 items-center max-w-7xl mx-auto px-6 ">
        <div className="w-full">
          <div className="hidden border-t border-[#333333] lg:block pt-8 w-full">
            <p className="uppercase text-2xl font-bold">A ZOO SANCTUARY</p>
            <p className="mt-4 text-lg">
              “It is our driving purpose to deepen the connection humans have
              with animals by creating sustainable animal sanctuaries for
              endangered species. Share the Zoo Sanctuary with local visitors,
              educators, host fundraisers/events, and get the Zoo Community as
              involved as possible to saving endangered animals all over the
              world. You could save a life today w/ a monthly donation or a
              one-time contribution. “
            </p>
          </div>
          <div className="hidden border-t border-[#333333] lg:block pt-8 w-full mt-16 mb-8">
            <p className="uppercase text-2xl font-bold">MAKE A DONATION</p>
            <p className="mt-4 text-lg">
              Once we have tax-exemption status you will be able to write off up
              to 100% of your donation.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row py-8 items-center max-w-7xl mx-auto">
        <div className=" mr-16">
          <UiSwitch
            sx={{ m: 1 }}
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <p className="text-[12px] font-[300] text-xl ml-3">
            Switch to Monthly
          </p>
        </div>
        <input
          placeholder="Enter Amount"
          className=" border-[1px] border-[#333333] h-16 text-center w-[202px] rounded-[5px] bg-transparent px-2 placeholder:text-[#777E91] placeholder:text-[14px] placeholder:font-[400] outline-none "
        />
        <button className="bg-blue rounded-[5px] ml-16 h-16 px-8 w-[202px]">
          Donate Now
        </button>
      </div>
    </section>
  );
};

export default Partnership;
