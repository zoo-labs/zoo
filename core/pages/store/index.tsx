// components
import { useEffect } from "react";
import { useAllProducts } from "state/store/hooks";
import HeroSection from "./HeroSection";
import ProductsSection from "./ProductsSection";

const Shop = () => {
  const getProducts = useAllProducts();
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="w-full mt-[100px]">
      <HeroSection />
      <ProductsSection />
    </div>
  );
};

export default Shop;
