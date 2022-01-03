import { FC } from 'react';

interface Props {
  article: {
    name: string;
    image: string;
  };
}
const Article: FC<Props> = ({ article: { name, image } }) => {
  return (
    <div className="max-w-[353px]">
      <div className="h-[259px] bg-dark-blue flex items-center">
        <img src={image} alt="" />
      </div>
      <div className="my-4 flex justify-start">
        <p className="text-label text-white px-2 py-1 bg-dark-pink rounded inline">
          New
        </p>
      </div>
      <p className="text-butter-white font-semibold text-2xl text-left mb-[25px]">
        {name}
      </p>
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-2">
          <img src="/img/trainer.png" alt="" />
          <p>Portner Daniel</p>
        </div>
        <p>Feb 03, 2021</p>
      </div>
      <hr />
    </div>
  );
};

export default Article;
