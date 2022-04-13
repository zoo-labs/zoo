import Link from "next/link";

const Info = () => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto my-[100px] px-4">
        <div className="flex flex-col gap-8 lg:flex-row ">
          {/* Contact Information Section */}
          <div className="flex-[1.5]">
            <nav className="flex gap-4 pb-4 border-b border-gray-600 cursor-pointer">
              <Link href="/store/checkout/cart">
                <a>Cart {">"}</a>
              </Link>
              <p className="cursor-pointer text-green">Information {">"}</p>
              <p>Shipping {">"}</p>
            </nav>
            {/* Form */}
            <div className="mt-8 lg:w-10/12">
              <div>
                <p className="mb-2 font-semibold">Contact Information</p>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400"
                />
              </div>
              <div className="flex gap-4 mt-8 text-gray-400">
                <input
                  type="checkbox"
                  className="w-[16px] h-[16px] mt-1 inline-block"
                />
                <p>Email me with news and offers</p>
              </div>
              <div className="mt-8">
                <p className="mb-2 font-semibold">Shipping address</p>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <select className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400 outline-none">
                    <option>Nigeria</option>
                    <option>Ghana</option>
                  </select>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Appartment suite, etc"
                    className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400"
                  />
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400"
                    />
                  </div>
                  <div className="flex-1">
                    <select
                      placeholder="State"
                      className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400 outline-none"
                    >
                      <option>State</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400"
                    />
                  </div>
                </div>
                <div className="">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400"
                  />
                </div>
              </div>
            </div>
            {/* Form Buttons */}
            <div className="flex flex-col gap-6 mt-8 lg:flex-row">
              <Link href="/store/checkout/shipping">
                <a className="px-6 py-4 font-semibold text-black rounded-sm bg-green">
                  Continue to Shipping
                </a>
              </Link>
              <Link href="/store/cart">
                <a className="px-6 py-4 font-semibold text-white bg-transparent rounded-sm">
                  Return to cart
                </a>
              </Link>
            </div>
          </div>

          {/* Payment Info Section*/}
          <div className="flex-1">
            <div className="flex justify-between mb-8">
              <div className="w-[150px] h-[120px]">
                <img
                  src="/img/store-1.png"
                  className="object-cover object-center w-full h-full"
                  alt=""
                />
              </div>
              <div className="text-gray-400">
                <p>Top Rainy Days Collection 21</p>
                <p>Extra Large</p>
              </div>
              <p className="font-semibold">$260.99</p>
            </div>

            <div className="py-4 mt-8 space-y-2 border-t border-b border-gray-600">
              <div className="flex items-center justify-between">
                <p>Subtotal</p>
                <p className="font-semibold">$260.99</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Shipping</p>
                <p className="font-semibold">$15.00</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-4">
              <p>Total</p>
              <p className="font-semibold">$275.99</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
