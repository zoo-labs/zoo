import React from "react";

const Main = ({
  children,
  isModal,
  innerClassName,
  bgColor = "bg-black",
}: {
  children: React.ReactNode;
  isModal?: boolean;
  innerClassName?: string;
  bgColor?: string;
}) => (
  <main
    className={`flex flex-col items-center justify-start flex-grow w-full h-full ${bgColor}`}
    style={{ height: "max-content" }}
  >
    <div className={`w-full ${!isModal && "mt-12 lg:mt-20"} ${innerClassName}`}>
      {" "}
      <>{children}</>
    </div>
  </main>
);

export default Main;
