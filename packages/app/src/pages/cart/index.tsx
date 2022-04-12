import Link from "next/link";

const Cart = () => {
  const products = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto my-[100px] px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:justify-between">
          <div className="flex-[1.5]">
            <div className="shop-item">
              <h2 className="text-base pb-2 border-b border-gray-600 mb-8">
                Your Shopping Cart
              </h2>
              <div className="flex gap-4">
                <div>
                  <img src="/img/store-1.png" className="" alt="" />
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">Zoo Merch</p>
                  <p className="text-gray-400">Top Rainy Days Collection 21</p>
                  <p className="text-gray-400">Extra Large</p>
                  <p className="font-bold">$260.99</p>
                  <div className="text-gray-400 ">
                    <p className="mb-1 mt-8">Quantity</p>
                    <div className="flex flex-col lg:flex-row gap-4">
                      <input
                        type="number"
                        className="bg-transparent bg-[#1f1f1f] py-2 px-2"
                      />
                      <button className="underline">Remove Item</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-base pb-2 border-b border-gray-600 mb-8">
              Subtotal
            </h2>
            <p className="text-2xl font-bold">$260.99</p>
            <div className="mt-8">
              <p className="bg-[#1F1F1F] p-4">
                Lorem ipsum dolor sit amet, consectetur adipielit. Purus
                volutpat sit purus at semper turpis aliquam suspendisse
                vestibulum. Odio faucibus dui lectus odio est sapien mi sapien,
                tristique. Tempor in malesuada sed tempor, cursus.
              </p>
            </div>
            <div className="mt-8 flex items-start gap-6">
              <input type="checkbox" className="w-[24px] h-[24px] mt-1" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipielit. Purus
                volutpat sit purus at semper turpis.
              </p>
            </div>

            <Link href="/info">
              <a className="mt-8 w-full bg-green text-black py-4 px-6 rounded-sm font-semibold block text-center">
                Checkout
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-[100px]">
        <h2 className="text-base pb-2 border-b border-gray-600 mb-8">
          Checkout these new releases too
        </h2>
        <div className="">
          <div className="max-w-7xl mx-auto px-4 my-[64px]">
            <div className="flex justify-between flex-wrap">
              {products.map((item, index) => {
                return (
                  <div key={index} className="md:basis-1/3 mb-8">
                    <a href={`/store/${item.id}`}>
                      <>
                        <img src="/img/store-1.png" alt="" className="mb-4" />
                        <div className="mb-4">
                          <p>Zoo Merch Top Rainy Days</p>
                          <p>Collection 21</p>
                        </div>
                        <p>$260.99</p>
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
