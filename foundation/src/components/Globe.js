
import  React,{useReducer,useRef,useEffect,useState} from "react";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Globe_ from "react-globe.gl";
// import Globe from 'react-globe.gl';

function Globe() {
  const locationData = [
    {
      lat: 35.3608368337679,
      lng: -80.19239471516728,
      size: 15,
      color: 'red',
      name: 'Red Wolf',
      index: '0',
      img: 'wolf_card.png',
      location: 'Northeastern North Carolina, Albemarle Peninsula',
      link: '/animals/red_wolf'
    },
    {
      lat: 16.35562470208783,
      lng: 30.190179066974082,
      size: 15,
      color: 'orange',
      name: 'Nubian Giraffe',
      index: '1',
      img: 'giraffe_card.png',
      location: 'Sudan',
      link: '/animals/nubian_giraffe'
    },
    // {
    //   lat: 8.633207935723622,
    //   lng: 39.42326110933409,
    //   size: 15,
    //   color: 'orange',
    //   name: 'Nubian Giraffe',
    //   index: '2',
    //   img: 'giraffe_card.png',
    //   location: 'Ethiopia',
    //   link: '/animals/nubian_giraffe'
      
    // },
    // {
    //   lat: 0.47300209922687764,
    //   lng: 37.870876773462285,
    //   size: 15,
    //   color: 'orange',
    //   name: 'Nubian Giraffe',
    //   index: '3',
    //   img: 'giraffe_card.png',
    //   location: 'Kenya',
    //   link: '/animals/nubian_giraffe'
    // },
    // {
    //   lat: 1.531451858707507,
    //   lng: 32.276718283426035,
    //   size: 15,
    //   color: 'orange',
    //   name: 'Nubian Giraffe',
    //   index: '4',
    //   img: 'giraffe_card.png',
    //   location: 'Uganda',
    //   link: '/animals/nubian_giraffe'
    // },
    // {
    //   lat: 45.3523116,
    //   lng: 132.0691275,
    //   size: 15,
    //   color: 'blue',
    //   name: 'Amur Leopard',
    //   index: '5',
    //   img: 'leopard_card.png',
    //   location: 'Primorsky Krai region, North Korea',
    //   link: '/animals/amur_leopard'
    // },
    {
      lat: 43.83872868926112,
      lng: 126.54842744956659,
      size: 15,
      color: 'blue',
      name: 'Amur Leopard',
      index: '6',
      img: 'leopard_card.png',
      location: 'Jilin Province, Northeast China',
      link: '/animals/amur_leopard'
    },
    {
      lat: -0.2525635996655117,
      lng: 101.7437025180159,
      size: 15,
      color: 'grey',
      name: 'Sumatran Elephant',
      index: '7',
      img: 'elephant_card.png',
      location: 'Sumatra, Indonesia',
      link: '/animals/sumatran_elephant'
    },
    {
      lat: 8.555912688734379,
      lng: -11.93188504132818,
      size: 15,
      color: 'deeppink',
      name: 'Pygmy Hippo',
      index: '8',
      img: 'hippo_card.png',
      location: 'Sierra Leone',
      link: '/animals/pygmy_hippo'
    },
    // {
    //   lat: 10.430783079619287,
    //   lng: -11.05788480394038,
    //   size: 15,
    //   color: 'deeppink',
    //   name: 'Pygmy Hippo',
    //   index: '9',
    //   img: 'hippo_card.png',
    //   location: 'Guinea',
    //   link: '/animals/pygmy_hippo'
    // },
    // {
    //   lat: 7.600263138954803,
    //   lng: -5.5740189822360104,
    //   size: 15,
    //   color: 'deeppink',
    //   name: 'Pygmy Hippo',
    //   index: '10',
    //   img: 'hippo_card.png',
    //   location: 'Ivory Coast',
    //   link: '/animals/pygmy_hippo'
    // },
    // {
    //   lat: 6.299971104902609,
    //   lng: -9.33259268241796,
    //   size: 15,
    //   color: 'deeppink',
    //   name: 'Pygmy Hippo',
    //   index: '11',
    //   img: 'hippo_card.png',
    //   location: 'Liberia',
    //   link: '/animals/pygmy_hippo'
    // },
    {
      lat: 47.52364129104774,
      lng: 138.01555438190678,
      size: 15,
      color: 'purple',
      name: 'Siberian Tiger',
      index: '12',
      img: 'tiger_card.png',
      location: 'Sikhote-Alin mountain range, Russia',
      link: '/animals/siberian_tiger'
    },
    // {
    //   lat: 46.42478474206638,
    //   lng: 128.21550477246348,
    //   size: 15,
    //   color: 'purple',
    //   name: 'Siberian Tiger',
    //   index: '13',
    //   img: 'tiger_card.png',
    //   location: "Northeast China's Heilongjiang Province",
    //   link: '/animals/siberian_tiger'
    // },
    {
      lat: -6.784491972807376,
      lng: 105.37508733885018,
      size: 15,
      color: 'yellow',
      name: 'Javan Rhino',
      index: '14',
      img: 'rhino_card.png',
      location: "Ujung Kulon National Park , Java, Indonesia",
      link: '/animals/javan_rhino'
    },
  ];
  const arcsData = [{
    startLat: 16.35562470208783,
    startLng: 30.190179066974082,
    endLat: 8.633207935723622,
    endLng: 39.42326110933409,
    color: ['orange','orange']
  },
  {
    startLat: 8.633207935723622,
    startLng: 39.42326110933409,
    endLat: 0.47300209922687764,
    endLng: 37.870876773462285,
    color: ['orange','orange']
  },{
    startLat: 0.47300209922687764,
    startLng: 37.870876773462285,
    endLat: 1.531451858707507,
    endLng: 32.276718283426035,
    color: ['orange','orange']
  },{
    startLat: 1.531451858707507,
    startLng: 32.276718283426035,
    endLat: 16.35562470208783,
    endLng: 30.190179066974082,
    color: ['orange','orange']
  },{
    startLat: 45.3523116,
    startLng: 132.0691275,
    endLat: 43.83872868926112,
    endLng: 126.54842744956659,
    color: ['blue','blue']
  },{
    startLat: 8.555912688734379,
    startLng: -11.93188504132818,
    endLat: 10.430783079619287,
    endLng: -11.05788480394038,
    color: ['deeppink','deeppink']
  },{
    startLat: 10.430783079619287,
    startLng: -11.05788480394038,
    endLat: 7.600263138954803,
    endLng: -5.5740189822360104,
    color: ['deeppink','deeppink']
  },{
    startLat: 7.600263138954803,
    startLng: -5.5740189822360104,
    endLat: 6.299971104902609,
    endLng: -9.33259268241796,
    color: ['deeppink','deeppink']
  },{
    startLat: 6.299971104902609,
    startLng: -9.33259268241796,
    endLat: 8.555912688734379,
    endLng: -11.93188504132818,
    color: ['deeppink','deeppink']
  },{
    startLat: 47.52364129104774,
    startLng: 138.01555438190678,
    endLat: 46.42478474206638,
    endLng: 128.21550477246348,
    color: ['purple','purple']
  }];
  const globeRef = useRef(null);

  // Use callback ref to set up controls
  const handleGlobeReady = (globe) => {
    if (globe && globe.controls) {
      globe.controls().enableZoom = false;
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.7;
    }
    globeRef.current = globe;
  };
  const size = useWindowSize();
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }
var marker_flag = false;
return <div className={`w-full bg-transparent flex justify-center items-center`}>

    <Globe_
    ref={handleGlobeReady}
    globeImageUrl={"//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"}
    backgroundColor={"#000"}
    width={size.width * 0.35}
    height={`${size.width < 768? (size.width + 100) * 0.35 : size.width * 9 / 16 * 0.35}`}
    htmlElementsData={locationData}
    onGlobeClick={(e) => {
      console.log("globe click!!!",marker_flag);
      if(!marker_flag){
        const info_panels = document.getElementsByClassName('info-panel');
        Array.from(info_panels).forEach(element => {
          element.classList.add('hidden');
        });
      }
      marker_flag = false;
      return;
    }}
    htmlElement={d => {
      const el = document.createElement('div');
      el.innerHTML = `
      <div style='relative'>
      <svg viewBox="-4 0 36 36">
        <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
        <circle fill="black" cx="14" cy="14" r="7"></circle>
      </svg>
      <div id='info_panel_${d.index}' class='info-panel absolute top-[-5px] left-[20px] flex hidden flex-col md:min-w-[180px] max-md:min-w-[140px] bg-gray-900 border border-gray-700 rounded-lg min-h-[150px] p-2 space-y-4 max-md:space-y-2'>
        <div class='w-full flex items-center space-x-4 max-md:space-x-2'>
          <Image
            class='flex-1 w-1/2'
            src='/images/${d.img}'
            width='1000'
            height='1000'
            alt=''
          />
          <p class='flex-1 text-base max-md:text-xs text-white'>${d.name}</p>
        </div>
        <p class='text-sm max-md:text-xs text-gray-300'>${d.location}</p>
        <a href='${d.link}' class='flex items-center text-white justify-between hover:text-gray-300 transition-colors'>
          <p class='text-sm max-md:text-xs'>Learn More</p>
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.76727 4.33639C7.88057 4.41604 7.88057 4.58396 7.76727 4.66361L1.7141 8.91907C1.64504 8.96762 1.55294 8.96758 1.48393 8.91899L0.232426 8.03776C0.119235 7.95806 0.119297 7.79024 0.232548 7.71062L4.56676 4.66361C4.68006 4.58396 4.68006 4.41604 4.56676 4.33639L0.232555 1.28938C0.119305 1.20977 0.119241 1.04194 0.232432 0.962242L1.48393 0.0810142C1.55294 0.0324163 1.64504 0.0323817 1.7141 0.0809275L7.76727 4.33639Z" fill="white"/>
          </svg>
        </a>
      </div>
      </div>
    `;
      el.style.color = d.color;
      el.style.width = `${d.size}px`;
      var flag = false;
      el.style['pointer-events'] = 'auto';
      el.style.cursor = 'pointer';
      el.onclick = () => {
        marker_flag = true;
      const info_panels = document.getElementsByClassName('info-panel');
      Array.from(info_panels).forEach(element => {
        element.classList.add('hidden');
      });
      const info_panel = document.getElementById('info_panel_'+d.index);
      if(!flag)info_panel.classList.remove("hidden")
      else info_panel.classList.add('hidden')
      flag = !flag;
      };
      return el;
    }}
    />
    
</div>
}
export default Globe