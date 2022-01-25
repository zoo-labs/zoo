import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
interface Props {
  article: {
    name: string;
    image: string;
  };
}
const Article: FC<Props> = ({ article: { name, image } }) => {
  return (
    <div className="mb-8 lg:mb-8 bg-dark-blue flex flex-col max-w-sm">
      <Link href={`/blog/${name}`}>
        <a>
          <div className="mb-4 overflow-hidden">
            <Image
              src={image}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="cover"
              alt=""
            />
          </div>
          <div className="px-4 py-8">
            <div className="flex flex-col items-start mb-4">
              <p className="bg-blue text-white rounded-sm text-xs font-bold px-2 py-1 uppercase">
                New
              </p>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
              {name}
            </h3>
            <div className="flex justify-between items-center">
              <div className="flex ">
                <Image src="/img/trainer.png" width={24} height={24} alt="" />
                <p className="ml-3">Portner Daniel</p>
              </div>
              <p>Feb 03, 2021</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Article;

{
  /* 
   <div className="bg-dark-blue">
        <Image src="/img/lion.png" width={300} height={300} alt="" />
      </div>
      <div className="">
        <p className="">
          New
        </p>
      </div>
      <p className="">
        {name}
      </p>
      <div className="">
        <div className="">
          <Image src="/img/trainer.png" width={16} height={16} alt="" />
          <p>Portner Daniel</p>
        </div>
        <p>Feb 03, 2021</p>
      </div>
      <hr className="" />
  */
}
