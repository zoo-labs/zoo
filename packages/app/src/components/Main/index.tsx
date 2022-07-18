import React from "react";

const Main = ({
  children,
  isModal,
}: {
  children: React.ReactNode;
  isModal?: boolean;
}) => (
  <main
    className="flex flex-col items-center justify-start flex-grow w-full h-full bg-black"
    style={{ height: "max-content" }}
  >
    <div className={`w-full ${!isModal && "mt-12 lg:mt-20"}`}>
      {" "}
      <>{children}</>
    </div>
  </main>
);

export default Main;
