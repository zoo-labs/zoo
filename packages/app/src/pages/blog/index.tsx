import React, { useState } from 'react';
import articles from '../../components/blog/articles.json';
import Article from 'components/blog/articles';

const Blog = () => {
  const [activeNav, setActiveNav] = useState('all');
  return (
    <div className="mt-5em text-center">
      <div className="flex items-center flex-col">
        <p className="text-8xl text-white font-bold">ZOO Blog</p>
        <p className="w-96 mb-20 ">
          Track your workouts, get better results, and be the best version of
          you. Less thinking, more lifting.
        </p>
      </div>
      <div className="flex flex-col items-center px-6 pb-20 mx-auto max-w-7xl">
        <div className="flex flex-col items-center max-w-xl mx-auto lg:flex-row lg:items-stretch lg:max-w-5xl">
          <div className="overflow-hidden  lg:basis-1/2">
            <img src="/img/story-image.png" width={565} height={516} alt="" />
          </div>
          <div className="flex flex-col justify-center lg:text-left px-4 lg:px-14 py-8 -mt-4 lg:py-0 bg-deep-gray rounded-b-2xl lg:rounded-l-none lg:rounded-r-2xl lg:-ml-1 lg:basis-1/2">
            <div className="mb-5">
              <p className="text-label text-white px-2 py-1 bg-dark-pink rounded inline">
                New
              </p>
            </div>
            <h2 className="mb-3 text-3xl font-bold text-white w-full lg:w-4/6">
              Stories From Our Community: Kohaku &amp; Moyo Shiro
            </h2>
            <p className="mb-4 text-muted">
              How the ZOO foundation helped save over 100,000 acres of elephant
              habitat to date.{' '}
            </p>
            <div>
              <button className="font-bold text-white bg-orange rounded-full py-2 px-1">
                Read full story
              </button>
            </div>
            {/* {!account && (
              <button className="w-1/2 px-5 py-3 text-sm text-white rounded-full ZooNews__btn md:text-base md:px-6 md:py-4 lg:px-10">
                Connect Wallet
              </button>
            )} */}
          </div>
        </div>
      </div>
      <div className="mb-20 flex justify-center">
        <ul className="flex gap-2">
          <li
            className={`${
              activeNav === 'all' && 'border bg-white rounded-full '
            } text-dark px-4 cursor-pointer`}
            onClick={() => setActiveNav('all')}
          >
            All
          </li>
          <li
            className={`${
              activeNav === 'news' &&
              'border bg-white rounded-full  cursor-pointer'
            } px-4 text-dark cursor-pointer`}
            onClick={() => setActiveNav('news')}
          >
            News
          </li>
          <li
            className={`${
              activeNav === 'zoo-guides' &&
              'border bg-white rounded-full cursor-pointer'
            } px-4 text-dark cursor-pointer`}
            onClick={() => setActiveNav('zoo-guides')}
          >
            ZOO Guides
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-3 gap-10 mb-20 px-32">
        {articles.map((article) => (
          <Article key={article.name} article={article} />
        ))}
      </div>
      <div className="my-16">
        <p className="font-semibold border-b-2 text-white inline cursor-pointer">
          Load all
        </p>
      </div>
    </div>
  );
};

export default Blog;
