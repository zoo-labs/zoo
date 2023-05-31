import Link from 'next/link';
import Slider from 'react-slick';
import Image from 'next/image';

function Carosuel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };
  const animals = [
    {
      title: "Nubian Giraffe",
      img: "/images/giraffe.png"
    },
    {
      title: "Amur Leopard",
      img: "/images/leopard.png"
    },
    {
      title: "Sumatran Elephant",
      img: "/images/elephant.png"
    },
    {
      title: "Siberian Tiger",
      img: "/images/tiger.png"
    }

  ];
  return (
    <div className="bg-black text-center md:px-52 px-6 pt-32">
        <p className='text-gray-300 text-lg md:text-center text-left'>Emotionally Intelligent</p>
        <h1 className='text-white md:text-center text-left md:text-3xl xl:text-6xl max-md:text-2xl mt-5 mb-8'>Future Upgrades</h1>
        <p className='text-gray-300 text-sm md:text-center text-left xl:text-xl pb-16 md:px-52'>The future of these digital collectibles are more then what meets the eye, an ai chat feature will soon be available for all Zoo Animals!</p>
        <Slider {...settings} className='w-1/2 max-md:w-full m-auto p-8 border rounded-xl border-white mb-20'>

          {animals.map((data, index) => (
          <div>
              <Image
                  className='carousel-img m-auto w-1/2 max-md:w-full'
                  src={data.img}
                  width='800'
                  height='800'
                  alt=''
              />
          </div>
        ))}
        </Slider>
        <Link href='#' className='bg-white m-auto text-black text-lg rounded-full px-6 py-2 '>Digital</Link>
    </div>
  );
}

export default Carosuel;
