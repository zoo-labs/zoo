function Donation_Spent() {
    return (
      <div className="bg-[#3C9465] max-md:bg-black max-md:text-white text-black max-md:py-32 md:py-12 lg:py-12 max-md:px-0 px-16">
        <div className='flex max-md:flex-col justify-between max-md:space-y-24 '>
          <div className="flex flex-col flex-1 2xl:pr-56 xl:pr-24 lg:pr-12 md:pr-4 space-y-24 max-md:space-y-12 max-md:px-4">
            <h1 className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-3xl max-md:text-4xl ">How is your donation spent?</h1>
            <div className="flex items-center text-black w-full border border-black rounded-full bg-white">
                <div className="flex flex-col items-center px-4 md:px-1 bg-[#3C9465] rounded-l-full py-2 xl:w-[10%] lg:w-[15%] md:w-[20%]">
                    <p className="lg:text-sm md:text-xs max-md:text-xs">Admin</p>
                    <p className="lg:text-sm md:text-xs max-md:text-xs">10%</p>
                </div>
                <div className="flex flex-col items-center px-4 md:px-1 py-2 xl:w-[20%] lg:w-[25%] bg-[#5AE299] border-x border-black md:w-[30%]">
                    <p className="lg:text-sm md:text-xs max-md:text-xs">Marketing</p>
                    <p className="lg:text-sm md:text-xs max-md:text-xs">20%</p>
                </div>
                <div className="flex flex-col items-center px-4 md:px-1 lg:px-4 py-2">
                    <p className="lg:text-sm md:text-xs max-md:text-xs">Programs + Services</p>
                    <p className="lg:text-sm md:text-xs max-md:text-xs">70%</p>
                </div>
            </div>
          </div>
          <div className="max-md:bg-[#3C9465] grid text-black grid-cols-2 max-md:grid-cols-1 max-md:py-12 flex-1 gap-x-16 px-12 md:px-4 lg:px-8 lg:gap-x-12 md:gap-x-4">
            <div className="flex flex-col border-y border-black pt-4 pb-12 md:pb-8 space-y-8">
                <h3 className="2xl:text-3xl xl:text-2xl lg:text-2xl md:text-base ">Programs +<br className="max-md:hidden block"/>Services</h3>
                <p className="lg:text-base md:text-xs">70% of your donation supports our practical conservation initiatives, such as habitat preservation, species protection, and community engagement, making a real-world difference.</p>
            </div>
            <div className="flex flex-col border-y border-black pt-4 pb-12 md:pb-8 space-y-8">
                <h3 className="2xl:text-3xl xl:text-2xl lg:text-2xl md:text-base  md:min-h-[48px] lg:min-h-[64px] 2xl:min-h-[72px] ">Marketing</h3>
                <p className="lg:text-base md:text-xs">20% of your donations help raise further awareness and financial support for our cause, aiding us to broaden our reach and escalate our impact in the conservation landscape.</p>
            </div>
            <div className="flex flex-col border-b border-black pt-4 pb-12 md:pb-8 space-y-8">
                <h3 className="2xl:text-3xl xl:text-2xl lg:text-2xl md:text-base ">Administrative Costs</h3>
                <p className="md:text-xs lg:text-base">10% of your donation backs the operational backbone of our organization, enabling us to navigate legal avenues effectively and maintain essential collaborations for wildlife protection.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Donation_Spent;

