import { useCart } from "state/store/hooks";
import { CartItem } from "types/cart";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "state/hooks";
import { Product } from "types/product";
import { useEffect, useState } from "react";
import { useAllProducts } from "state/store/hooks";

const ShopDetails = () => {
  const [addToCart, removeFromCart, clearCart] = useCart();
  const router = useRouter();
  const { id } = router.query;
  const {
    Products,
    CartItems,
  }: { Products: Product[]; CartItems: CartItem[] } = useAppSelector(
    (state) => state.store
  );
  const [product, setProduct] = useState<Product>();
  const [size, setSize] = useState<string>();
  const [color, setColor] = useState<string>();
  const [adendums, setAdendums] = useState<string[]>();

  useEffect(() => {
    if (Products) {
      const data = Products.find((products) => products.id === id);

      setProduct(data);
    }
  }, [Products, id]);

  return (
    <div className="w-full my-[100px]">
      <div className="mx-auto max-w-7xl">
        {product ? (
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Images */}
            <div className="flex flex-col-reverse lg:flex-row flex-[1.5] gap-4 px-4">
              {/** Side images */}
              <div className="flex lg:flex-col flex-[0.5] flex-row gap-4">
                {product.galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-full h-[200px] object-contain mb-4"
                  >
                    <img
                      src={image}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
              {/* Main Image */}
              <div className="flex-1">
                <div className="w-full">
                  <img
                    src={product?.image}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="flex-1 px-4">
              <h2 className="mb-4 text-2xl">{product.name}</h2>
              <p className="mb-4 text-xl font-bold">${product.basePrice}</p>
              <p className="mb-4 text-gray-400">{product.description}</p>
              <ul className="pl-8 mb-8 space-y-3 list-disc">
                {product.properties.adendums.map((val, index) => (
                  <li key={index}>{val}</li>
                ))}
              </ul>
              <div className="flex gap-8 mb-8">
                <select className="px-2 py-2 bg-transparent border-t border-b border-gray-400 outline-none">
                  {product.properties.sizes.map((sizer, index) => (
                    <option onClick={() => setSize(sizer)} key={index}>
                      {sizer}
                    </option>
                  ))}
                </select>
                {/* <button
                  onClick={() => clearCart()}
                  className="px-6 py-2 font-semibold text-black rounded-sm bg-red"
                >
                  Clear Cart
                </button> */}
                {CartItems?.some((item) => item.productId === id) ? (
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="px-6 py-2 font-semibold text-black rounded-sm bg-red"
                  >
                    Remove From Cart
                  </button>
                ) : (
                  <button
                    // improve on this using just the product id
                    onClick={() =>
                      addToCart({
                        name: product.name,
                        basePrice: product.basePrice,
                        discountPrice: product.discountPrice,
                        description: product.description,
                        properties: { size, color, adendums },
                        image: product.image,
                        galleryImages: product.galleryImages,
                        productId: product.id,
                        id: Math.floor(Math.random() * Date.now()).toString(),
                        quantity: 1,
                      } as CartItem)
                    }
                    className="px-6 py-2 font-semibold text-black rounded-sm bg-green"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
              <p>
                Secure payments with MoonPay, Paypal, Stripe or your Wallet{" "}
              </p>
            </div>
          </div>
        ) : (
          <div>Add spinner here for loading</div>
        )}
      </div>
    </div>
  );
};

export default ShopDetails;
