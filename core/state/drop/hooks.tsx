// import axios from "axios";
// import { abis } from "../../constants";
// import { getContract } from "../../functions";
// import { useActiveWeb3React, useDrop, useZooKeeper } from "../../hooks";
// import { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addEgg } from "../../state/zoo/actions";
// import { AvailableEgg, Drop } from "../../types";
// import { useGetAvailableEggs } from "../zoo/hooks";
// import { addDrops } from "./action";
// import { convertIpfsUrl } from "../../entities/index";
//
// export const getMetaData = async (metadataURI: string, from?: any) => {
//   const uri = convertIpfsUrl(metadataURI);
//   try {
//     const res = await axios.get(uri, {
//       headers: {
//         Accept: "text/plain",
//       },
//     });
//     // console.log("getting data 2", res.data);
//     return res.data;
//   } catch (err) {
//     console.log("getting data error", err, "from", from, "uri", metadataURI);
//   }
// };
//
// export function useGetDrops() {
//   const dispatch = useDispatch();
//   const zooKeeper = useZooKeeper();
//   const { library, chainId } = useActiveWeb3React();
//
//   if (!zooKeeper) return Promise.reject()
//
//   // using useCallback to ensure the function doesn't change across re-renders
//   return useCallback(() => {
//       // getting the number of drop IDs
//       const dropIDs = zooKeeper.dropIDs();
//
//       // creating an array of promises (one for each drop ID)
//       const dropPromises = Array.from({length: dropIDs}, (_, dropId) => {
//         // each promise corresponds to a drop
//         return new Promise(async (resolve, reject) => {
//           try {
//             const dropAddress = await zooKeeper.drops(dropId + 1);
//             const dropC = getContract(
//               dropAddress,
//               abis[chainId.toString()]["Drop"],
//               library,
//               undefined
//             );
//             const dropTitle = await dropC.title();
//             const totalSupply = await dropC.totalSupply();
//             const eggs = await dropC.getAllEggs();
//             const dropInfo = await dropC.dropInformation(dropTitle);
//
//             // creating a new promise for each valid egg in a drop
//             const eggPromises = eggs.filter((eggData: any) => eggData.exist).map((egg: any) => {
//               return new Promise(async (resolve, reject) => {
//                 try {
//                   const data = await getMetaData(egg.data.metadataURI);
//                   const { name, description, attributes, image, animation_url } = data;
//
//                   const finalEgg: AvailableEgg = {
//                     bidShares: {
//                       creator: Number(egg?.bidShares?.creator),
//                       owner: Number(egg?.bidShares?.owner),
//                       prevOwner: Number(egg?.bidShares?.prevOwner),
//                     },
//                     birthday: Number(egg.birthday),
//                     exist: egg?.exist,
//                     id: Number(egg.id),
//                     kind: egg.kind,
//                     minted: Number(egg.minted),
//                     name: egg.name,
//                     description,
//                     price: Number(egg.price),
//                     supply: Number(egg.supply),
//                     timestamp: Number(egg.timestamp),
//                     image: `https://zoolabs.mypinata.cloud/ipfs/${image?.slice(7)}`,
//                     animation_url: `https://zoolabs.mypinata.cloud/ipfs/${animation_url?.slice(
//                       7
//                     )}`,
//                     attributes,
//                   };
//
//                   // resolving each egg promise with final egg data
//                   resolve(finalEgg);
//                 } catch (error) {
//                   // rejecting promise if an error occurs
//                   reject(error);
//                 }
//               });
//             });
//
//             // waiting for all egg promises to resolve
//             const finalEggs = await Promise.all(eggPromises);
//
//             // building new drop data
//             const newDrop = {
//               title: dropTitle,
//               description: dropInfo.description,
//               image: dropInfo.image,
//               items: finalEggs,
//               supply: finalEggs.reduce((a, b) => a + b.supply, 0),
//               minted: finalEggs.reduce((a, b) => a + b.minted, 0),
//               dropSupply: finalEggs.length,
//               dropId: 1, // assuming this is always 1, change it as per your requirements
//             };
//
//             // resolving each drop promise with new drop data
//             resolve(newDrop);
//           } catch (error) {
//             // rejecting promise if an error occurs
//             reject(error);
//           }
//         });
//       });
//
//       // waiting for all drop promises to resolve
//       Promise.all<Drop>(dropPromises)
//         .then((drops: Drop[] ) => {
//           // dispatching the result to redux store
//           dispatch(addDrops(drops));
//         })
//         .catch(err => console.error("Failed to fetch eggs", err));
//   }, [dispatch, library, zooKeeper]);
// }


import axios from "axios";
import { abis } from "../../constants";
import { getContract } from "../../functions";
import { useActiveWeb3React, useZooKeeper } from "../../hooks";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addDrops } from "./action";
import { AvailableEgg, Drop } from "../../types";
import { convertIpfsUrl } from "../../entities/index";

// Function to fetch metadata
export const getMetaData = async (metadataURI: string, from?: any) => {
  const uri = convertIpfsUrl(metadataURI);
  try {
    const res = await axios.get(uri, {
      headers: {
        Accept: "text/plain",
      },
    });
    return res.data;
  } catch (err) {
    console.log("getting data error", err, "from", from, "uri", metadataURI);
  }
};

export function useGetDrops() {
  const dispatch = useDispatch();
  const zooKeeper = useZooKeeper();
  const { library, chainId } = useActiveWeb3React();

  // If no ZooKeeper is present, reject the Promise
  if (!zooKeeper) return Promise.reject()

  // Function for getting drops using useCallback to prevent unnecessary rerenders
  return useCallback(() => {
      const dropIDs = zooKeeper.dropIDs();

      const dropPromises = Array.from({length: dropIDs}, (_, dropId) => {
        return new Promise<Drop>(async (resolve, reject) => { // assert the type as Drop
          try {
            const dropAddress = await zooKeeper.drops(dropId + 1);
            const dropC = getContract(
              dropAddress,
              abis[chainId.toString()]["Drop"],
              library,
              undefined
            );
            const dropTitle = await dropC.title();
            const totalSupply = await dropC.totalSupply();
            const eggs = await dropC.getAllEggs();
            const dropInfo = await dropC.dropInformation(dropTitle);

            const eggPromises = eggs.filter((eggData: any) => eggData.exist).map((egg: any) => {
              return new Promise(async (resolve, reject) => {
                try {
                  const data = await getMetaData(egg.data.metadataURI);
                  const { name, description, attributes, image, animation_url } = data;

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

                  resolve(finalEgg);
                } catch (error) {
                  reject(error);
                }
              });
            });

            const finalEggs = await Promise.all(eggPromises);

            const newDrop = {
              title: dropTitle,
              description: dropInfo.description,
              image: dropInfo.image,
              items: finalEggs,
              supply: finalEggs.reduce((a, b) => a + b.supply, 0),
              minted: finalEggs.reduce((a, b) => a + b.minted, 0),
              dropSupply: finalEggs.length,
              dropId: 1,
            };

            resolve(newDrop);
          } catch (error) {
            reject(error);
          }
        });
      });

      // Handle results from all the promises
      Promise.all(dropPromises)
        .then((drops) => {
          dispatch(addDrops(drops));
        })
        .catch(err => console.error("Failed to fetch eggs", err));
  }, [dispatch, library, zooKeeper]);
}
