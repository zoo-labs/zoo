const Shipping = () => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 my-[100px]">
        <div className="max-w-4xl mx-auto">
          <div className="w-full flex flex-col justify-center items-center bg-[#1f1f1f] border border-gray-600 py-4 px-6">
            <div className="flex w-full py-4 border-b border-gray-700">
              <p className="flex-1 text-gray-600">Contact</p>
              <p className="flex-1 text-gray-400 px-2">
                {" "}
                Testmailforzoo@gmail.com
              </p>
              <button className="flex-1 font-semibold">Change</button>
            </div>
            <div className="flex w-full py-4 border-b border-gray-700">
              <p className="flex-1 text-gray-600">Ship to</p>
              <p className="flex-1 text-gray-400">
                {" "}
                Zoo- Jersey, 3030 Ave New Jersy- USA, 3030 Ave, New Jersey- USA
              </p>
              <button className="flex-1 font-semibold">Change</button>
            </div>
            <div className="flex w-full py-4 ">
              <p className="flex-1 text-gray-600">Method</p>
              <p className="flex-1 text-gray-400">
                Free international Shipping over $250
              </p>
              <div className="flex-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="max-w-7xl mx-auto px-4 my-[100px]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Payment</h2>
            <p className="text-gray-400">
              All transactions are secure and encrypted.
            </p>
          </div>

          <div className="bg-[#1f1f1f] border border-gray-600">
            <div className="border-b border-gray-800 py-4  px-6">
              <div className="flex gap-4 items-center">
                <input type="radio" className="bg-[#1f1f1f] bg-transparent" />
                <img src="/img/pay/metamask.png" alt="" />
              </div>
            </div>
            <div className="border-b border-gray-800 py-4  px-6">
              <div className="flex gap-4 items-center">
                <input type="radio" />
                <img src="/img/pay/moonpay.png" alt="" />
              </div>
            </div>
            <div className="border-b border-gray-800 py-4  px-6">
              <div className="flex gap-4 items-center">
                <input type="radio" />
                <img src="/img/pay/stripe.png" alt="" />
              </div>
            </div>
            <div className="py-4  px-6">
              <div className="flex gap-4 items-center">
                <input type="radio" />
                <img src="/img/pay/paypal.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Shipping;
