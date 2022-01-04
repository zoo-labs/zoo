import Image from "next/image";

const EndangeredSpecies = () => {
  return (
    <div className="border rounded-lg py-12 px-6 bg-black100 w-full max-w-lg">
      <div className="text-center mb-8">
        <h2 className="font-bold text-3xl mb-4">Save Endangered Species</h2>
        <p className="text-grey">
          10% of all gaming fees will be donated to non-profit organizations.
          Grow your animals, view yield earned per animal, and breed mature
          animals to mint more NFTs!
        </p>
      </div>
      <div className="mb-8">
        <div className="flex items-start">
          <Image src="/img/hatch.png" width={32} height={32} alt="" />
          <div className="ml-6">
            <p className="text-white font-bold">Hatch</p>
            <p className="max-w-sm text-grey">
              Your NFT Egg to reveal the animal within and learn about it.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex items-start">
          <Image src="/img/feed.png" width={32} height={32} alt="" />
          <div className="ml-6">
            <p className="text-white font-bold">Feed</p>
            <p className="max-w-sm text-grey">
              Your animal $ZOO to increase the value of your animal NFT.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex items-start">
          <Image src="/img/grow.png" width={32} height={32} alt="" />
          <div className="ml-6">
            <p className="text-white font-bold">Grow</p>
            <p className="max-w-sm text-grey">
              Your animal and watch it transition through its different stages
              of maturity.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex items-start">
          <Image src="/img/breed.png" width={32} height={32} alt="" />
          <div className="ml-6">
            <p className="text-white font-bold">Breed</p>
            <p className="max-w-sm text-grey">
              Your fully mature animal to mint new Egg NFT’s. Breed the animals
              up to 6x.
            </p>
          </div>
        </div>
      </div>
      <p className="text-center mb-4">
        <span className="text-green">Earn yield</span> while you play{" "}
        <span className="text-white">Zoo</span> on our Metamask App.
      </p>
      <div className="flex justify-end">
        <a
          href="https://dex.guru/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13-bsc"
          target="_blank"
          rel="noreferrer"
          className="bg-gradient-to-b from-purple to-blue text-white text-sm md:text-base px-5 py-3 md:px-6 md:py-4 lg:px-10 rounded-full"
        >
          Buy $ZOO
        </a>
      </div>
    </div>
  );
};

export default EndangeredSpecies;
