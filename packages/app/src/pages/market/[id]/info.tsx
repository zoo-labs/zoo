import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { Auction } from "types";
import { shortenAddress } from "functions";
import { abbreviateNumber } from "functions/abbreviateNumbers";
import { useGetAllAuctions } from "state/zoo/hooks";
import { useZooKeeper } from "hooks";
import Web3 from "web3";
import styled from "styled-components";
import moment from "moment";
import { AccessAlarmRounded } from "@mui/icons-material";

const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 16px;
    padding-left: 48px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #0f0f0f;
    color: white;
  }
`;

const ModelViewer = dynamic(() => import("components/ModelViewer"), {
  ssr: false,
});
const InfoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { allAuctions } = useSelector((state: any) => state.zoo);
  const [nft, setNft] = useState<Auction>();
  const [showTable, setShowTable] = useState(true);
  const getAllAuctions = useGetAllAuctions();
  const zooKeeper = useZooKeeper();
  const [zooBnbPrice, setZooBnbPrice] = useState(0);

  const calculateTimeLeft = useCallback(() => {
    const endDate = new Date(nft?.firstBidTime * 1000 + nft?.duration * 1000);
    const difference = +new Date(endDate) - +new Date();

    let timeLeft: any = {};

    if (difference >= 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [nft?.duration, nft?.firstBidTime]);

  const [ttimeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    let interval;
    if (ttimeLeft.d === 0 && ttimeLeft.h === 0 && ttimeLeft.m === 0) {
      clearInterval(interval);
    }
    if (ttimeLeft.d === 0 && ttimeLeft.h !== 0) {
      interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000 * 60 * 60);
    } else if (ttimeLeft.d === 0 && ttimeLeft.h === 0 && ttimeLeft.m !== 0) {
      interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000 * 60);
    } else {
      setTimeLeft(calculateTimeLeft());
    }
    return () => clearTimeout(interval);
  }, [calculateTimeLeft]);

  console.log("AUCTION_TIME_LEFT", ttimeLeft);

  const getZooBnbPrice = useCallback(async () => {
    const price = await zooKeeper?.BNBPrice();
    const value = Web3.utils.fromWei(price?.toString(), "ether");
    setZooBnbPrice(parseFloat(value));
  }, [zooKeeper]);

  useEffect(() => {
    getZooBnbPrice();
    getAllAuctions();
  }, [getZooBnbPrice, getAllAuctions]);

  const amountPriceBNB = zooBnbPrice * Number(nft?.amount);
  const reservePriceBNB = zooBnbPrice * Number(nft?.reservePrice);

  useEffect(() => {
    const _nft = allAuctions?.find(
      (obj) => String(obj?.tokenID) === String(id)
    );
    setNft(_nft);
  }, [allAuctions, id]);

  console.log("NFTTTT_ANDAUCTION", nft);
  return (
    <div>
      <div className="showcase min-h-[500px] flex items-center justify-center">
        {nft?.kind === 0 ? (
          <video
            autoPlay
            loop
            src={nft.animation_url}
            width={300}
            height={350}
          />
        ) : (
          <div className="h-[450px] w-full">
            <ModelViewer
              // zoom="35deg"
              glb={nft?.glb_animation_url}
              usdz={nft?.usdz_animation_url}
            ></ModelViewer>
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start py-9 px-[70px] space-y-12 space-x-12 mb-5">
        <div className="w-full lg:w-3/5">
          <p className="font-semibold text-[56px] mb-2">{nft?.name}</p>
          <div className="flex gap-x-4">
            <div className="flex items-center gap-2">
              <Image src="/icons/status.svg" alt="" height={26} width={20} />
              <div>
                <p className="text-sm font-medium">
                  {nft?.attributes[0]?.trait_type}
                </p>
                <p className="font-medium text-[10px]">
                  {nft?.attributes[0]?.value}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/population.svg"
                alt=""
                height={26}
                width={20}
              />
              <div>
                <p className="text-sm font-medium">
                  {nft?.attributes[1]?.trait_type}
                </p>
                <p className="font-medium text-[10px]">
                  {nft?.attributes[1]?.value}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/icons/react.svg" alt="" height={26} width={20} />
              <div>
                <p className="text-sm font-medium">
                  {nft?.attributes[2]?.trait_type}
                </p>
                <p className="font-medium text-[10px]">
                  {nft?.attributes[2]?.value}
                </p>
              </div>
            </div>
          </div>

          <div className="my-5">
            <p className="mb-3 text-xl font-semibold">Description</p>
            <hr className="w-full h-px mb-10 opacity-40" />
            <p className="text-lg font-light text-butter-white">
              Introducing Only1 Genesis NFTs and Creator Staking Pool - where
              Defi meets social in only1. Each creator passed KYC will be minted
              a Genesis-NFT, which they can associate with perks and rewards and
              trade it in the marketplace. Users on the platform can stake $LIKE
              tokens on individual creators and earn based on the pool’s APY,
              which adjusts according to the creator’s engagement. ‍
            </p>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-full bg-nft-gradient" />
            <p className="ml-4 text-xl font-bold text-steel">
              {nft?.tokenOwner ? shortenAddress(nft?.tokenOwner) : ""}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-2/5 border border-white-30 rounded-lg h-auto max-h-fit py-[22px] px-[26px]">
          <div className="flex items-center justify-end">
            {nft?.firstBidTime ? (
              Object.keys(ttimeLeft).length > 0 ? (
                <div className="py-2 text-xs font-medium rounded-full bg-zoo-green px-7">
                  Active
                </div>
              ) : (
                <div className="py-2 text-xs font-medium rounded-full bg-red px-7">
                  Ended
                </div>
              )
            ) : (
              <div className="py-2 text-xs font-medium rounded-full bg-yellow px-7">
                No Bid
              </div>
            )}
          </div>
          <div>
            <div className="flex  space-x-3.5 mb-2 flex-col">
              <p className="text-sm font-normal text-white opacity-60">
                Reserve Price
              </p>

              <div className="flex items-center space-x-3.5">
                <p className="text-2xl font-semibold">
                  {abbreviateNumber(nft?.reservePrice)} ZOO
                </p>
                <p className="font-medium text-base text-[#909090]">
                  ({abbreviateNumber(reservePriceBNB)} BNB)
                </p>
              </div>
            </div>
            <div className="flex space-x-3.5 mb-2 flex-col">
              <p className="text-sm font-normal text-white opacity-60">
                Last Bid Price
              </p>
              <div className="flex items-center space-x-3.5">
                <p className="text-2xl font-semibold">
                  {abbreviateNumber(nft?.amount)} ZOO
                </p>
              </div>
            </div>
            <div>
              <p className="text-white opacity-60 text-sm font-normal mb-2.5">
                Auction Duration
              </p>
              <p className="font-semibold text-[40px] mb-[41px]">
                {nft?.firstBidTime
                  ? Object.keys(ttimeLeft).length > 0
                    ? ttimeLeft.d
                      ? `${ttimeLeft.d} Day${ttimeLeft.d > 1 ? "s" : ""}  Left`
                      : ttimeLeft.h
                      ? `${ttimeLeft.h} Hour${ttimeLeft.h > 1 ? "s" : ""} & ${
                          ttimeLeft.m
                        } Minutes Left`
                      : `${ttimeLeft.m} Minutes Left`
                    : "Auction has ended"
                  : "Auction has not started yet"}
              </p>
            </div>
          </div>
          {nft?.firstBidTime && Object.keys(ttimeLeft).length > 0 && (
            <Link href={`/market/placebid/${id}`} passHref>
              <button className="py-[18px] w-full bg-leader-board rounded-[4px]">
                Place Bid
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="w-full px-[70px] mb-10">
        <div className="w-full border rounded-lg border-white-30 ">
          <div className="flex items-center justify-between px-12 py-4">
            <p>Current Bids</p>
            <Image
              src="/icons/caaret-down.svg"
              alt=""
              width={15}
              height={8}
              onClick={() => setShowTable(!showTable)}
              className="cursor-pointer"
            />
          </div>
          <Table className={`w-full ${!showTable && "hidden"}`}>
            <tr className="">
              <th>From</th>
              <th>Price</th>
              <th>Floor Offer</th>
              <th>Offer Time</th>
              <th>Expiration</th>
            </tr>
            <tr>
              <td>Niccage22031</td>
              <td>0.015 ETH</td>
              <td>100% Below</td>
              <td>31/03/2022 / 11:46 AM</td>
              <td>In 3 days</td>
            </tr>

            <tr>
              <td>Niccage22031</td>
              <td>0.015 ETH</td>
              <td>100% Below</td>
              <td>31/03/2022 / 11:46 AM</td>
              <td>In 3 days</td>
            </tr>

            <tr>
              <td>Niccage22031</td>
              <td>0.015 ETH</td>
              <td>100% Below</td>
              <td>31/03/2022 / 11:46 AM</td>
              <td>In 3 days</td>
            </tr>

            <tr>
              <td>Niccage22031</td>
              <td>0.015 ETH</td>
              <td>100% Below</td>
              <td>31/03/2022 / 11:46 AM</td>
              <td>In 3 days</td>
            </tr>

            <tr>
              <td>Niccage22031</td>
              <td>0.015 ETH</td>
              <td>100% Below</td>
              <td>31/03/2022 / 11:46 AM</td>
              <td>In 3 days</td>
            </tr>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
