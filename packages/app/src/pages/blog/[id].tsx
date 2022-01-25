import Image from "next/image";
import articles from "../../components/blog/articles.json";
import Article from "components/blog/articles";

const BlogDetails = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-16 px-4">
        <header className="mb-20">
          <h1 className="text-center text-5xl font-bold mb-8">Zoo News</h1>
          <div className="max-w-5xl mx-auto">
            <div className="p-1 rounded-lg flex flex-col items-center">
              <Image
                src="/img/blog-details-img.png"
                width={851}
                height={346}
                alt=""
                objectFit="contain"
              />
            </div>
          </div>
        </header>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="basis-2/3">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12">
              Genesis NFT and how to stake and earn from Creator Staking Pool
            </h2>
            <div className="mb-12">
              <p className="mb-12">
                Introducing Only1 Genesis NFTs and Creator Staking Pool - where
                Defi meets social in only1. Each creator passed KYC will be
                minted a Genesis-NFT, which they can associate with perks and
                rewards and trade it in the marketplace. Users on the platform
                can stake $LIKE tokens on individual creators and earn based on
                the pool’s APY, which adjusts according to the creator’s
                engagement.{" "}
              </p>

              <p>
                Only1 believes that the future of NFTs will serve a key function
                within the tech world and that utility NFTs will inevitably
                spill into other verticals outside gaming. They also think art
                and collectible NFTs will slowly be replaced by utility NFTs,
                and hence have made them an integral part of their concept and
                earning mechanisms. There are two main methods that Only1 uses
                to prioritize social engagement between fans and influencers. ‍
              </p>
            </div>
            <div>
              <h2 className="mb-8 text-3xl lg:text-4xl font-bold">
                Genesis NFTs and Creator Staking Pool
              </h2>
              <div className="max-w-5xl mx-auto mb-12">
                <div className="p-1 rounded-lg flex flex-col items-center">
                  <Image
                    src="/img/blog-details-img-2.png"
                    width={851}
                    height={346}
                    alt=""
                    objectFit="contain"
                  />
                </div>
              </div>
              <div>
                <p className="mb-6">
                  1. Mint: When a new creator is onboarded to Only1, a
                  Genesis-NFT is minted and a staking pool is created
                </p>
                <p className="mb-6">
                  {" "}
                  2. Buy: Fans can bid for Genesis-NFTs via the Only1
                  marketplace with $LIKE tokens. Bid tokens are also burned to
                  create scarcity and increase buying pressure
                </p>
                <p className="mb-6">
                  3. Stake: Fans can stake $LIKE tokens on influencers that they
                  support. The annual percentage yield (APY) of the staking pool
                  changes depending how active and engaging an influencer is —
                  higher the activity, higher the APY. Both the creator and
                  owner of the Genesis-NFT split staking rewards! ‍
                </p>
                <p className="text-green mt-12">
                  Visit{" "}
                  <a
                    href="www.only1.app"
                    target="_blank"
                    rel="noreferrer"
                    className="text-green"
                  >
                    www.only1.app
                  </a>{" "}
                  to see our creator staking pool in live!
                </p>
              </div>
            </div>
          </div>
          <div className="basis-1/3">
            <div className="flex flex-col mb-16 items-center">
              {articles.map((article) => (
                <Article article={article} key={article.name} />
              ))}
            </div>
            <div className="flex justify-center">
              <a
                href="/blog"
                className="underline text-white text-base md:text-lg font-bold px-8 py-3 md:px-6 lg:px-16 rounded-full hover:cursor-pointer"
              >
                View all blogs <Image src="/img/right-arrow.svg" width={32} height={32} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
