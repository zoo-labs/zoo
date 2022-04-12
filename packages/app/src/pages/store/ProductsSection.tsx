import { useState } from "react";
import { useAppSelector } from "state/hooks";
import { Product } from "types/product";

export interface ProductInterface {
  name: String;
  price: string;
  discount_price: string;
  description: string;
  properties: {
    colors: Array<string>;
    sizes: Array<string>;
    adendums: Array<string>;
  };
  image: string;
  gallery_image: Array<string>;
  quantity: number;
  _id: string;
  status: string;
}

const ProductsSection = () => {
  const { Products } = useAppSelector((state) => state.store);
  console.log("Products in section", Products);
  return (
    <div className="w-full mt-[64px]">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center">
          <h1 className="mb-4 text-4xl font-bold text-center text-white">
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
          <div className="flex flex-wrap justify-between">
            {Products && Products.length > 0 ? (
              Products.map((item: Product, index) => {
                const { name, shortDescription, image, basePrice, id } = item;
                return (
                  <div key={index} className="mb-8 md:basis-1/3">
                    <a href={`/store/${id}`}>
                      <>
                        <img src={image} alt="" className="mb-4" />
                        <div className="mb-4">
                          <p>{name}</p>
                          <p>{shortDescription}</p>
                        </div>
                        <p>${basePrice}</p>
                      </>
                    </a>
                  </div>
                );
              })
            ) : (
              <div>No products</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
