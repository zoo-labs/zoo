import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppSelector } from "state/hooks";
import { CartItem } from "types/cart";

import { countries } from "data/countries";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Info = () => {
  const [shippingDetails, setShippingDetails] = useState<{
    email: string;
    firstName: string;
    lastName: string;
  }>({ email: "", firstName: "", lastName: "" });
  const [shippingPrice, setShippingPrice] = useState(15);
  const [subTotal, setSubTotal] = useState(0);
  const [country, setCountry] = useState("");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleChange = (name, value: string) => {
    setShippingDetails({ ...shippingDetails, [name]: value });
  };
  const { CartItems }: { CartItems: CartItem[] } = useAppSelector(
    (state) => state.store
  );
  useEffect(() => {
    setSubTotal(
      CartItems.reduce(
        (memo, item) => memo + parseFloat(item.basePrice) * item.quantity,
        0
      )
    );
  }, [CartItems]);
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto my-[100px] px-4">
        <div className="flex flex-col gap-8 lg:flex-row ">
          {/* Contact Information Section */}
          <div className="lg:w-[60%]">
            <nav className="flex gap-4 pb-4 border-b border-gray-600 cursor-pointer">
              <Link href="/store/checkout/cart" legacyBehavior>
                Cart{">"}
              </Link>
              <p className="cursor-pointer text-green">Shipping {">"}</p>
              <p>Payment {">"}</p>
            </nav>
            {/* Form */}
            <div className="mt-8 lg:w-10/12">
              <div>
                <p className="mb-2 font-semibold">Contact Information</p>
                <input
                  onChange={(e) => handleChange("email", e.target.value)}
                  type="email"
                  value={shippingDetails.email}
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
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      value={shippingDetails.firstName}
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      value={shippingDetails.lastName}
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <select
                    className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400 outline-none"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  >
                    {countries.map((data, index) => (
                      <option key={`${index}${data.name}`} value={data.name}>
                        {data.name}
                      </option>
                    ))}
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
              <Link
                href="/store/checkout/payment"
                className="px-6 py-4 font-semibold text-black rounded-sm bg-green">
                
                  Continue to Payments
                
              </Link>
              <Link
                href="/store/cart"
                className="px-6 py-4 font-semibold text-white bg-transparent rounded-sm">
                
                  Return to cart
                
              </Link>
            </div>
          </div>

          {/* Payment Info Section*/}
          <div className="lg:w-[40%]">
            {CartItems.map((item, index) => {
              return (
                <Slider {...settings} key={index} className="">
                  <div className="px-4">
                    <div className="flex justify-between mb-8">
                      <div className="w-[150px] h-[120px]">
                        <img
                          src={item.image}
                          className="object-cover object-center w-full h-full"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col text-gray-400">
                        <p>{item.name}</p>
                        <p>{item.properties.size}</p>
                        <p>{item.properties?.color}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Quantity</p>
                      <p className="font-semibold">{item.quantity}</p>
                    </div>
                  </div>
                </Slider>
              );
            })}

            <div className="py-4 mt-8 space-y-2 border-t border-b border-gray-600">
              <div className="flex items-center justify-between">
                <p>Subtotal</p>
                <p className="font-semibold">$ {subTotal}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Shipping</p>
                <p className="font-semibold">${shippingPrice}</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-4">
              <p>Total</p>
              <p className="font-semibold">${shippingPrice + subTotal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
