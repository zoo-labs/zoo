import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAvailableEggs } from "../zoo/hooks";
import { addDrops } from "./action";

export function useGetDrops() {
  const getEggs = useGetAvailableEggs();
  const dispatch = useDispatch();
  const { availableEggs: eggs } = useSelector((state: any) => state.zoo);
  return useCallback(async () => {
    getEggs();
    const drop = {
      animation_url:
        "https://zoolabs.mypinata.cloud/ipfs/QmYYxLfqcyQtLrjQu4PupGE2bF2Pdq8TsRzgKx6M2VenoU",
      attributes: null,
      bidShares: {
        creator: 10000000000000000000,
        owner: 80000000000000000000,
        prevOwner: 10000000000000000000,
      },
      birthday: 0,
      description:
        "The Siberian Tiger, a subspecies of tiger, is the largest cat in the world and prowls throughout Northeast Asia. It is a large cat, with adult males weighing up to 700lbs, and females being significantly smaller at approximately 400 lbs. Siberian Tigers differ from other tiger subspecies because they have fewer, paler stripes, and they also have manes. The mane, in addition to their thick fur, helps to keep them warm and can be significant influences in both mating displays and in disputes, too. These tigers are quick, nimble, and ready to pounce.",
      exist: true,
      id: 100,
      image: "/img/pngwing.png",
      glb_animation_url: "/models/Tiger/TIGER_ADULT.glb",
      usdz_animation_url: "/models/Tiger/TIGER_ADULT.usdz",
      kind: 1,
      minted: 4,
      name: "Siberian Tiger",
      price: 100,
      supply: 1440,
      timestamp: 0,
    };

    dispatch(addDrops([...eggs, drop]));
  }, [dispatch, eggs]);
}
