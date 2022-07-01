import { useState, useEffect } from "react";
import { useCreateAuction } from "state/zoo/hooks";
import { useDispatch } from "react-redux";
import { useActiveWeb3React } from "hooks";

const CreateAuctionPage = () => {
  const [tokenId, setTokenId] = useState<any>("");
  const [duration, setDuration] = useState<any>("");
  const [reservedPrice, setReservedPrice] = useState<any>("");
  const [curatorFeePercentage, setCuratorFeePercentage] = useState<any>("");

  const createAuction = useCreateAuction();
  const dispatch = useDispatch();
  const account = useActiveWeb3React();

  console.log("account", account);

  // const { tokenId, duration, reservedPrice, curatorFeePercentage } = formData;

  // const onChange = (e) => {
  //   setFormData((prevState) => {
  //     return {
  //       ...prevState,
  //       [e.target.name]: +[e.target.value],
  //     };
  //   });
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    const token = isNaN(tokenId) ? 0 : +tokenId;
    const _duration = isNaN(duration) ? 0 : +duration;
    const _reservedPrice = isNaN(reservedPrice) ? 0 : +reservedPrice;
    const _curatorFeePercentage = isNaN(curatorFeePercentage)
      ? 0
      : +curatorFeePercentage;

    dispatch(
      createAuction(token, _duration, _reservedPrice, _curatorFeePercentage)
    );
  };

  return (
    <div>
      <div className="pt-16 pb-16 px-6 lg:max-w-7xl lg:mx-auto">
        <div className="py-16">
          <h1 className="text-4xl">Create Auction</h1>
        </div>
        <div className="flex flex-col lg:flex-row">
          <form
            className="flex-1 rounded-md p-[1px] bg-nft-gradient"
            onSubmit={onSubmit}
          >
            <div className="bg-black px-4 py-4 rounded-md">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="token Id"
                  id="tokenId"
                  name="tokenId"
                  className="px-2 py-2 bg-[#333] w-full rounded-md"
                  value={isNaN(tokenId) ? 0 : +tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="duration"
                  id="duration"
                  name="duration"
                  className="px-2 py-2 bg-[#333] w-full rounded-md"
                  value={isNaN(duration) ? 0 : +duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="reserve price"
                  id="reservePrice"
                  name="reservePrice"
                  className="px-2 py-2 bg-[#333] w-full rounded-md"
                  value={isNaN(reservedPrice) ? 0 : +reservedPrice}
                  onChange={(e) => setReservedPrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="curator fee percentage"
                  id="curatorFeePercentage"
                  name="curatorFeePercentage"
                  className="px-2 py-2 bg-[#333] w-full rounded-md"
                  value={
                    isNaN(curatorFeePercentage) ? 0 : +curatorFeePercentage
                  }
                  onChange={(e) =>
                    setCuratorFeePercentage(parseInt(e.target.value))
                  }
                />
              </div>

              <button
                type="submit"
                className="bg-blue px-4 py-2 text-white w-full rounded-md"
              >
                Create Auction
              </button>
            </div>
          </form>
          <div className="flex-1 flex justify-center items-center">
            <p className="text-grey">Image goes here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAuctionPage;
