import Link from "next/link";

const ShopDetails = () => {
  return (
    <div className="w-full my-[100px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Images */}
          <div className="flex flex-col-reverse lg:flex-row flex-[1.5] gap-4 px-4">
            {/** Side images */}
            <div className="flex lg:flex-col flex-[0.5] flex-row gap-4">
              <div className="w-full h-[200px] object-contain mb-4">
                <img
                  src="/img/store-1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-[200px] object-contain mb-4">
                <img
                  src="/img/store-1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-[200px] object-contain mb-4">
                <img
                  src="/img/store-1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Main Image */}
            <div className="flex-1">
              <div className="w-full">
                <img
                  src="/img/store-1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="flex-1 px-4">
            <h2 className="text-2xl mb-4">
              Zoo Merch Top Rainy Days Collection 21
            </h2>
            <p className="text-xl font-bold mb-4">$260.99</p>
            <p className="text-gray-400 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              imperdiet tortor pulvinar phasellus purus venenatis congue. Eget
              est non amet ultrices. Leo dolor leo bibendum donec consequat
              imperdiet iaculis consequat lectus.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Duis imperdiet tortor
            </p>
            <ul className="list-disc mb-8 pl-8 space-y-3">
              <li>Relaxed Fit</li>
              <li>100% Cotton</li>
              <li>Inside Out Wear</li>
            </ul>
            <div className="flex gap-8 mb-8">
              <select className="bg-transparent outline-none border-t border-b border-gray-400 py-2 px-2">
                <option>Small(sm)</option>
                <option>Medium(md)</option>
                <option>Large(lg)</option>
                <option>Extra Large(xl)</option>
              </select>
              <Link href="/cart">
                <a className="bg-green text-black py-2 px-6 rounded-sm font-semibold">
                  Add To Cart
                </a>
              </Link>
            </div>
            <p>Secure payments with MoonPay, Paypal, Stripe or your Wallet </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
