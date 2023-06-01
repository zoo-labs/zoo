[View code on GitHub](zoo-labs/zoo/blob/master/core/src/components/NftCard/index.tsx)

The `NftCard` component is a React component that renders a card displaying information about a non-fungible token (NFT). The component takes in several props, including an image, name, address, days left, highest bid, price, yields per day, and currency. 

The component is designed to be used in a larger project that involves displaying NFTs to users. The `NftCard` component can be used to display information about a single NFT, and can be repeated multiple times to display information about multiple NFTs. 

The component renders a card with a black background and a rounded border. The card contains an image of the NFT, as well as information about the NFT's name, price, address, days left, highest bid, and yields per day. The currency used for the price and yields can be specified using the `currency` prop, which defaults to "ZOO". 

The `NftCard` component is designed to be flexible and customizable. The image prop can be any valid React node, allowing for the use of images, videos, or other media types. The component also uses Tailwind CSS classes to style the card, making it easy to customize the appearance of the card to match the design of the larger project. 

Here is an example of how the `NftCard` component could be used in a larger React project:

```
import React from "react";
import NftCard from "./NftCard";

const NftList = ({ nfts }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {nfts.map((nft) => (
        <NftCard
          key={nft.id}
          image={<img src={nft.image} alt={nft.name} />}
          name={nft.name}
          price={nft.price}
          address={nft.address}
          days={nft.daysLeft}
          highestBid={nft.highestBid}
          yields={nft.yieldsPerDay}
        />
      ))}
    </div>
  );
};

export default NftList;
```

In this example, the `NftList` component takes in an array of NFT objects and maps over them to render an `NftCard` component for each NFT. The `image` prop is passed as an `img` element with the `src` and `alt` attributes set to the corresponding values from the NFT object. The other props are passed directly from the NFT object.
## Questions: 
 1. What are the required props for the NftCard component?
- The required props for the NftCard component are "image", while "name", "price", "address", "days", "highestBid", "yields", and "currency" are optional.

2. What is the default value for the "currency" prop?
- The default value for the "currency" prop is "ZOO".

3. What is the purpose of the NftCard component?
- The NftCard component is a reusable component that displays information about a non-fungible token (NFT), including its image, name, price, address, days left, highest bid, and yields per day.