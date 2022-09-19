import axios from "axios";
import { useDrop, useZooKeeper } from "hooks";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEgg } from "state/zoo/actions";
import { AvailableEgg } from "types";
import { useGetAvailableEggs } from "../zoo/hooks";
import { addDrops } from "./action";

export function useGetDrops() {
  const getEggs = useGetAvailableEggs();
  const dispatch = useDispatch();
  const zooKeeper = useZooKeeper();
  const dropContract = useDrop(true);
  const { availableEggs: eggs } = useSelector((state: any) => state.zoo);
  const getData = async (uri) => {
    const res = await axios.get(uri);
    return res.data;
  };
  return useCallback(async () => {
    getEggs();
    const dropIds = [1];
    const drops = [];
    // await dropIds?.map(async (dropId, index) => {
    //   const drop = await zooKeeper.drops(dropId);
    //   console.log("dropss", drop);
    //   return drops.push(drop);
    // });
    const eggs: Array<any> = await dropContract?.getAllEggs();
    const dropTitle: string = await dropContract?.title();
    const totalSupply = await dropContract?.totalSupply();
    const eggsPromise = await eggs.map(async (egg) => {
      const data = await getData(
        egg.data.metadataURI.substring(0, 7) === "ipfs://"
          ? ` https://ipfs.io/ipfs/${egg.data.metadataURI.substring(7)}`
          : egg.data.metadataURI
      );

      const { name, description, attributes, image, animation_url } = data;
      const finalEgg: AvailableEgg = {
        bidShares: {
          creator: Number(egg?.bidShares?.creator),
          owner: Number(egg?.bidShares?.owner),
          prevOwner: Number(egg?.bidShares?.prevOwner),
        },
        birthday: Number(egg.birthday),
        exist: true,
        id: Number(egg.id),
        kind: egg.kind,
        minted: Number(egg.minted),
        name: egg.name,
        description,
        price: Number(egg.price) / Math.pow(10, 18),
        supply: Number(egg.supply),
        timestamp: Number(egg.timestamp),
        image: `https://zoolabs.mypinata.cloud/ipfs/${image?.slice(7)}`,
        animation_url: `https://zoolabs.mypinata.cloud/ipfs/${animation_url?.slice(
          7
        )}`,
        attributes,
      };
      return finalEgg;
    });
    await Promise.all(eggsPromise)
      .then((eggs) => {
        drops.push({
          title: dropTitle,
          description: "Drop Description",
          items: eggs,
          supply: eggs.reduce((a, b) => a + b.supply, 0),
          minted: eggs.reduce((a, b) => a + b.minted, 0),
          dropSupply: Number(totalSupply),
          dropId: 1,
        });
      })
      .catch((err) => console.error("mi_egg_promiseerror", err));

    console.log("drop dropContract", dropContract);
    dispatch(addDrops(drops));
  }, [dispatch, zooKeeper]);
}
