import React, { FC, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import Copy from "components/AccountDetails/Copy";
import Typography from "components/Typography";
import { useNetworkMigrationModalToggle } from "state/application/hooks";
import NetworkMigrationModal from "modals/NetworkMigrationModal";

const Banner: FC<{ type?: "default" | "network_migration" }> = ({
  type = "default",
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const toggleNetworkMigrationModal = useNetworkMigrationModalToggle();

  return (
    <>
      {showBanner ? (
        type === "network_migration" ? (
          <div className="relative w-full bg-purple bg-opacity-20">
            <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="pr-4 ">
                <span className="block text-left ">
                  <Typography
                    onClick={toggleNetworkMigrationModal}
                    className="hidden p-1 ml-1 text-xs font-bold text-left underline md:block text-green xs:w-full"
                  >
                    <a>Migrate network to get new tokens</a>
                  </Typography>

                  {/* <Typography className="p-1 text-xs font-bold text-left underline text-green xs:w-full ">
                    {`https://bscscan.com/address/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13`}
                  </Typography> */}
                </span>
              </div>
              {/* X Icon Div  */}
              <div className="absolute inset-y-0 right-0 flex items-center justify-center pt-1 pr-1 sm:pt-1 sm:pr-2 sm:items-start">
                <button
                  type="button"
                  className="flex p-2 focus:outline-none"
                  onClick={() => setShowBanner(false)}
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon
                    className="w-4 h-4 text-left text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full sm:mb-12 bg-purple bg-opacity-20">
            <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="pr-4 ">
                {/* <p className="font-medium text-white">
        <span className="md:hidden">We announced a new product!</span>
        <span className="hidden md:inline">
          Big news! We&apos;re excited to announce a brand new product.
        </span>
        <span className="block sm:ml-2 sm:inline-block">
          <a href="#" className="font-bold text-white underline">
            {" "}
            Learn more <span aria-hidden="true">&rarr;</span>
          </a>
        </span>
      </p> */}
                <span className="block text-left ">
                  <Copy
                    className="flex flex-wrap text-left xs:text-xs xs:w-full"
                    toCopy={
                      "https://bscscan.com/address/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13"
                    }
                  >
                    <Typography className="hidden p-1 ml-1 text-xs font-bold text-left underline md:block text-green xs:w-full">
                      <a
                        href="https://bscscan.com/address/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Link to BSC Scan
                      </a>
                    </Typography>

                    {/* <Typography className="p-1 text-xs font-bold text-left underline text-green xs:w-full ">
                    {`https://bscscan.com/address/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13`}
                  </Typography> */}
                  </Copy>
                </span>
              </div>
              {/* X Icon Div  */}
              <div className="absolute inset-y-0 right-0 flex items-center justify-center pt-1 pr-1 sm:pt-1 sm:pr-2 sm:items-start">
                <button
                  type="button"
                  className="flex p-2 focus:outline-none"
                  onClick={() => setShowBanner(false)}
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon
                    className="w-4 h-4 text-left text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        )
      ) : null}
      <NetworkMigrationModal />
    </>
  );
};

export default Banner;
