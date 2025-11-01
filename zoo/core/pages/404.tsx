import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl lg:text-[44px] leading-[3rem] lg:leading-4 mb-6">
        Oooops...
      </h1>
      <h2 className="text-2xl lg:text-3xl mb-4">That page cannot be found.</h2>
      <p className="text-xl">
        Go back to the <Link href="/">Homepage</Link>
      </p>
    </div>
  );
};

export default NotFound;
