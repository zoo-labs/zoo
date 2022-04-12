import { useCart } from "state/store/hooks";
import { CartItem } from "types/cart";

const ShopDetails = () => {
  const [addToCart] = useCart();
  return (
    <div className="w-full my-[100px]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Images */}
          <div className="flex flex-col-reverse lg:flex-row flex-[1.5] gap-4 px-4">
            {/** Side images */}
            <div className="flex lg:flex-col flex-[0.5] flex-row gap-4">
              <div className="w-full h-[200px] object-contain mb-4">
                <img
                  src="/img/store-1.png"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full h-[200px] object-contain mb-4">
                <img
                  src="/img/store-1.png"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full h-[200px] object-contain mb-4">
                <img
                  src="/img/store-1.png"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            {/* Main Image */}
            <div className="flex-1">
              <div className="w-full">
                <img
                  src="/img/store-1.png"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="flex-1 px-4">
            <h2 className="mb-4 text-2xl">
              Zoo Merch Top Rainy Days Collection 21
            </h2>
            <p className="mb-4 text-xl font-bold">$260.99</p>
            <p className="mb-4 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              imperdiet tortor pulvinar phasellus purus venenatis congue. Eget
              est non amet ultrices. Leo dolor leo bibendum donec consequat
              imperdiet iaculis consequat lectus.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Duis imperdiet tortor
            </p>
            <ul className="pl-8 mb-8 space-y-3 list-disc">
              <li>Relaxed Fit</li>
              <li>100% Cotton</li>
              <li>Inside Out Wear</li>
            </ul>
            <div className="flex gap-8 mb-8">
              <select className="px-2 py-2 bg-transparent border-t border-b border-gray-400 outline-none">
                <option>Small(sm)</option>
                <option>Medium(md)</option>
                <option>Large(lg)</option>
                <option>Extra Large(xl)</option>
              </select>
              <button
                onClick={() => addToCart({} as CartItem)}
                className="px-6 py-2 font-semibold text-black rounded-sm bg-green"
              >
                Add To Cart
              </button>
            </div>
            <p>Secure payments with MoonPay, Paypal, Stripe or your Wallet </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
