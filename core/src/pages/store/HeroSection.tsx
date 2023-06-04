import Link from "next/link";
import { useAppSelector } from "state/hooks";
import { CartItem } from "types/cart";

const HeroSection = () => {
  const { CartItems }: { CartItems: CartItem[] } = useAppSelector(
    (state) => state.store
  );
  return (
    <div className="flex justify-center">
      <div className="w-full px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex justify-center flex-1">
            <div className="w-full md:w-7/12">
              <input
                type="text"
                placeholder="Search Products Here"
                alt=""
                className="my-2 w-full rounded-sm px-2 py-4 outline-none bg-[#1f1f1f] text-base text-white"
              />
            </div>
          </div>
          <div className="flex">
            <Link href="/store/checkout/cart" className="bg-[#1f1f1f] py-4 px-6 flex gap-1">

              <img src="/img/cart.png" alt="" />Cart({CartItems.length})
            </Link>
            <Link
              href="/store/checkout/shipping"
              className="bg-[#393939] py-4 px-6 border-none">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
