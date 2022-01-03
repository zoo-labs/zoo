import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl lg:text-3xl mb-4">Coming Soon</h1>
      <p className="text-xl">
        Go back to the <Link href="/">Homepage</Link>
      </p>
    </div>
  );
};

export default ComingSoon;
