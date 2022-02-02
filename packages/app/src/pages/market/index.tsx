import ComingSoon from "components/ComingSoon";

const Market = () => {
  return (
    <div>
      <div className="flex flex-col items-center max-w-7xl px-6 mx-auto pt-16 lg:mt-20">
        <h2 className="text-2xl md:text-2xl lg:text-5xl text-center mb-6 md:mb-4 font-semibold mt-16">
          Fully Transparent Ecosystem
        </h2>
        <p className="max-w-3xl mx-auto text-center mb-6 md:mb-8 lg:text-xl">
          Each animal NFT uses blockchain technology to establish a verified and
          public proof of ownership. This establishes credibility for each NFT
          and its unchangeable nature.
        </p>
      </div>
      <ComingSoon />
    </div>
  );
};

export default Market;
