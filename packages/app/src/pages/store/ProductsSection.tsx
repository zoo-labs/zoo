const ProductsSection = () => {
  const products = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  return (
    <div className="w-full mt-[64px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            Welcome to the Zoo Store
          </h1>
          <p className="text-gray-400 text-lg text-center max-w-[600px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            accumsan turpis posuere cursus ultricies. Ut nunc justo, faucibus{" "}
          </p>
        </div>
      </div>
      <div className="">
        <div className="max-w-7xl mx-auto px-4 my-[64px]">
          <div className="flex justify-between flex-wrap">
            {products.map((item, index) => {
              return (
                <div key={index} className="md:basis-1/3 mb-8">
                  <img src="/img/store-1.png" alt="" className="mb-4" />
                  <div className="mb-4">
                    <p>Zoo Merch Top Rainy Days</p>
                    <p>Collection 21</p>
                  </div>
                  <p>$260.99</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
