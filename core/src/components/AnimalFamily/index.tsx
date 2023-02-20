import Image from "next/image";
import Link from "next/link";
import AnimalInfo from "pages/animal-info";

const AnimalFamily = ({ image, name, title, content }) => {
  return (
    <div className="flex flex-col items-center AnimalFamily__nfts">
      <div className="flex flex-col items-center justify-center AnimalFamily__nft lg:flex-row">
        <div className="flex flex-col items-center w-full h-auto mb-8 AnimalFamily__image lg:basis-1/3">
          <Image src={image} width={373} height={373} alt="" />
        </div>
        <div className="text-center AnimalFamily__name lg:basis-2/3">
          <h2 className="mb-6 text-3xl font-bold lg:4xl">{name}</h2>
          <Link href="/nft" passHref>
            <a className="px-8 py-3 text-sm font-bold text-white rounded-full bg-gradient-to-b from-purple to-blue md:text-base md:px-6 lg:px-16">
              Buy NFT
            </a>
          </Link>
        </div>
        <AnimalInfo />
      </div>
    </div>
  );
};

export default AnimalFamily;
