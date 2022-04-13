import Link from "next/link";
import { useAppSelector } from "state/hooks";
import { useCart } from "state/store/hooks";
import { CartItem } from "types/cart";
import { Product } from "types/product";

const Cart = () => {
  const [addToCart, removeFromCart, clearCart] = useCart();

  const {
    Products,
    CartItems,
  }: { Products: Product[]; CartItems: CartItem[] } = useAppSelector(
    (state) => state.store
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto my-[100px] px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="flex-[1.5]">
            <div className="shop-item">
              <h2 className="pb-2 mb-8 text-base border-b border-gray-600">
                Your Shopping Cart
              </h2>
              {CartItems && CartItems.length > 0 ? (
                CartItems.map((item, index) => {
                  const {
                    image,
                    name,
                    description,
                    properties,
                    basePrice,
                    productId,
                  } = item;
                  return (
                    <div key={index} className="flex gap-4">
                      <div>
                        <img src={image} className="" alt="" />
                      </div>

                      <div className="space-y-2">
                        <p className="font-semibold">{name}</p>
                        <p className="text-gray-400">{description}</p>
                        <p className="text-gray-400">{properties.size}</p>
                        <p className="font-bold">${basePrice}</p>
                        <div className="text-gray-400 ">
                          <p className="mt-8 mb-1">Quantity</p>
                          <div className="flex flex-col gap-4 lg:flex-row">
                            <input
                              type="number"
                              className="bg-transparent bg-[#1f1f1f] py-2 px-2"
                            />
                            <button
                              onClick={() => removeFromCart(productId)}
                              className="underline"
                            >
                              Remove Item
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>Cart is empty</div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="pb-2 mb-8 text-base border-b border-gray-600">
              Subtotal
            </h2>
            <p className="text-2xl font-bold">
              $
              {CartItems.reduce(
                (memo, item) =>
                  memo + parseFloat(item.basePrice) * item.quantity,
                0
              )}
            </p>
            <div className="mt-8">
              <p className="bg-[#1F1F1F] p-4">
                Lorem ipsum dolor sit amet, consectetur adipielit. Purus
                volutpat sit purus at semper turpis aliquam suspendisse
                vestibulum. Odio faucibus dui lectus odio est sapien mi sapien,
                tristique. Tempor in malesuada sed tempor, cursus.
              </p>
            </div>
            <div className="flex items-start gap-6 mt-8">
              <input type="checkbox" className="w-[24px] h-[24px] mt-1" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipielit. Purus
                volutpat sit purus at semper turpis.
              </p>
            </div>

            <Link href="/store/checkout/info">
              <a className="block w-full px-6 py-4 mt-8 font-semibold text-center text-black rounded-sm bg-green">
                Checkout
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-[100px]">
        <h2 className="pb-2 mb-8 text-base border-b border-gray-600">
          Checkout these new releases too
        </h2>
        <div className="">
          <div className="max-w-7xl mx-auto px-4 my-[64px]">
            <div className="flex flex-wrap justify-between">
              {Products.filter(
                (product) =>
                  !CartItems.some((item) => product.id === item.productId)
              ).map((item, index) => {
                return (
                  <div key={index} className="mb-8 md:basis-1/3">
                    <a href={`/store/${item.id}`}>
                      <>
                        <img src={item.image} alt="" className="mb-4" />
                        <div className="mb-4">
                          <p>{item.name}</p>
                          <p>{item.shortDescription}</p>
                        </div>
                        <p>${item.basePrice}</p>
                      </>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
