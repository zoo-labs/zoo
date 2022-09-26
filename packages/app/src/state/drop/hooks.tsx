import axios from "axios";
import { abis } from "../../constants";
import { getContract } from "functions";
import { useActiveWeb3React, useDrop, useZooKeeper } from "hooks";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEgg } from "state/zoo/actions";
import { AvailableEgg, Drop } from "types";
import { useGetAvailableEggs } from "../zoo/hooks";
import { addDrops } from "./action";

export function useGetDrops() {
  const dispatch = useDispatch();
  const zooKeeper = useZooKeeper();
  const { library } = useActiveWeb3React();
  const getData = async (uri) => {
    const res = await axios.get(uri);
    return res.data;
  };
  return useCallback(async () => {
    const drops = await [...Array(zooKeeper.dropIDs()).keys()]?.map(
      async (dropId, index) => {
        console.log("idddd", dropId);
        const dropAddress = await zooKeeper.drops(dropId + 1);
        console.log("dropAddress", dropAddress);
        const dropC = getContract(
          dropAddress,
          abis["97"]["Drop"],
          library,
          undefined
        );
        const dropTitle = await dropC.title();
        const totalSupply = await dropC?.totalSupply();
        const eggs: Array<any> = await dropC?.getAllEggs();
        const { image, description } = await dropC.dropInformation(dropTitle);
        const eggsPromise = await eggs
          .filter((eggData) => eggData.exist)
          .map(async (egg) => {
            const data = await getData(
              egg.data.metadataURI.substring(0, 7) === "ipfs://"
                ? ` https://ipfs.io/ipfs/${egg.data.metadataURI.substring(7)}`
                : egg.data.metadataURI
            );

            const { name, description, attributes, image, animation_url } =
              data;
            console.log("egggggg", egg);
            const finalEgg: AvailableEgg = {
              bidShares: {
                creator: Number(egg?.bidShares?.creator),
                owner: Number(egg?.bidShares?.owner),
                prevOwner: Number(egg?.bidShares?.prevOwner),
              },
              birthday: Number(egg.birthday),
              exist: egg?.exist,
              id: Number(egg.id),
              kind: egg.kind,
              minted: Number(egg.minted),
              name: egg.name,
              description,
              price: Number(egg.price),
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
        const dropPromise = await Promise.all(eggsPromise)
          .then((eggs) => {
            console.log("eggsPromise", eggs);

            const newDrop: Drop = {
              title: dropTitle,
              description,
              image,
              items: eggs,
              supply: eggs.reduce((a, b) => a + b.supply, 0),
              minted: eggs.reduce((a, b) => a + b.minted, 0),
              dropSupply: eggs.length,
              dropId: 1,
            };
            return newDrop;
          })
          .catch((err) => console.error("mi_egg_promiseerror", err));
        return dropPromise;
      }
    );
    await Promise.all(drops)
      .then((drop: Drop[]) => {
        console.log("dropsssss", drop);
        dispatch(addDrops(drop));
      })
      .catch((err) => console.error("mi_egg_promiseerror", err));
  }, [dispatch, zooKeeper]);
}
