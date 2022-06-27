import { useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Image from 'next/image'

const InfoComp = () => {
  const [sliderRef, setSliderRef] = useState(null)
  const data = [
    {
      id: 1,
      title: '1. You can list NFTs here,elsewhere... at the same time.',
      description: 'and when you get rewards for trading with LooksRare,why would you trade anywhere',
      image: '/img/buy-egg-img.png',
    },
    {
      id: 2,
      title: '2. You can list NFTs here,elsewhere... at the same time.',
      description: 'and when you get rewards for trading with LooksRare,why would you trade anywhere',
      image: '/img/buy-egg-img.png',
    },
    {
      id: 3,
      title: '3. You can list NFTs here,elsewhere... at the same time.',
      description: 'and when you get rewards for trading with LooksRare,why would you trade anywhere',
      image: '/img/buy-egg-img.png',
    },
  ]
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <div className="w-full bg-[#2DE370] text-black">
      <div className="max-w-[100vw] mx-auto px-8 mb-8">
        <p>👀Did you Know?</p>
      </div>
      <Slider ref={setSliderRef} {...settings} className="max-w-[100vw] mx-auto">
        {data.map((tip) => {
          return (
            <div key={tip.id} className="px-4">
              <div className="flex flex-col lg:flex-row justify-between gap-[32px] items-center">
                <div className="px-8 py-[64px]">
                  <div>
                    <div className="mb-4">
                      <h1 className="text-2xl lg:text-4xl font-bold max-w-[400px]">{tip.title}</h1>
                    </div>
                    <div>{tip.description}</div>
                  </div>
                </div>
                <div className="">
                  <Image src={tip.image} width={200} height={300} alt="egg" objectFit="contain" />
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <div className="flex justify-end items-center gap-4 font-semibold text-xl px-6 py-4 text-white">
          <button
            className="cursor-pointer bg-gray-800 border border-gray-800 px-2 py-0"
            onClick={sliderRef?.slickPrev}
          >
            {'<'}
          </button>
          <button
            className="cursor-pointer bg-gray-800 border border-gray-800 px-2 py-0"
            onClick={sliderRef?.slickNext}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default InfoComp
