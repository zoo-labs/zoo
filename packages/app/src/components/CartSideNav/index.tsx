import { useState } from "react";
import { useAppSelector } from "state/hooks";
import { CartItem } from "types/cart";

const CartSideNav = () => {
  const { CartItems }: { CartItems: CartItem[] } = useAppSelector(
    (state) => state.store
  );
  const [toggleCart, setToggleCart] = useState(false);

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
                <p className="mt-8">No items in cart</p>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CartSideNav;
