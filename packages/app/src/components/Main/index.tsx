const Main = ({ children, isModal }) => (
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
