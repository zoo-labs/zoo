const HeroSection = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex-1 flex justify-center">
            <div className="w-full md:w-7/12">
              <input
                type="text"
                placeholder="Search Products Here"
                alt=""
                className="my-2 w-full rounded-sm px-2 py-4 outline-none bg-[#1f1f1f] text-base text-white"
              />
            </div>
          </div>
          <div>
            <button className="bg-[#1f1f1f] py-4 px-6">Cart(0)</button>
            <button className="bg-[#393939] py-4 px-6">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
