import { useState } from "react";
import { useAppSelector } from "state/hooks";
import { CartItem } from "types/cart";

const CartSideNav = () => {
  const { CartItems }: { CartItems: CartItem[] } = useAppSelector(
    (state) => state.store
  );
  const [toggleCart, setToggleCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [showInput, setShowInput] = useState(false);

  return (
    <>
      {CartItems && CartItems.length > 0 && (
        <div className="relative flex ml-1 hover:cursor-pointer">
          <div
            className="relative flex"
            onClick={() => setToggleCart(!toggleCart)}
          >
            <img src="/img/cart.png" width={24} height={24} alt="" /> (
            {CartItems.length})
          </div>

          {toggleCart && (
            <div className="">
              <ul className="z-999 fixed lg:right-3 top-0 lg:top-auto left-0 lg:left-auto bottom-0 lg:bottom-auto  mb-8 lg:mt-8 py-8 w-full lg:w-[20vw] h-[90vh] lg:h-screen list-none flex flex-col justify-start items-start rounded-md bg-[#1f1f1f] text-white px-6">
                <div
                  className="flex justify-end w-full pb-2 border-b border-gray-700"
                  onClick={() => setToggleCart(!toggleCart)}
                >
                  <svg
                    className="block w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>

                {CartItems.map((item, index) => (
                  <div className="mt-4 w-full" key={index}>
                    <div className="flex gap-4 mb-8">
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
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4 justify-between">
                        <>
                          <p className="font-semibold">Quantity</p>
                          <p className="font-semibold">{item.quantity}</p>
                        </>
                        <div className="flex gap-2">
                          <button
                            className="flex gap-1 px-4 py-2 font-semibold text-white rounded-sm bg-[#000]"
                            onClick={() => setShowInput(!showInput)}
                          >
                            <img src="/img/edit.svg" alt="" />
                          </button>
                          <button className="flex gap-1 px-4 py-2 font-semibold text-white rounded-sm bg-red">
                            <img src="/img/delete.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      {showInput && (
                        <div className="mt-4 flex gap-1">
                          <input
                            onChange={(e) => setQuantity(+e.target.value)}
                            value={quantity}
                            type="text"
                            placeholder="First Name"
                            className="w-full px-4 py-2 bg-transparent bg-[#1f1f1f] border border-gray-400 rounded-sm"
                          />
                          <button className="px-4 py-2 font-semibold text-black rounded-sm bg-green">
                            Update
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CartSideNav;
