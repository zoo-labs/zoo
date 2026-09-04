
import React, { useEffect, useRef, useState } from 'react';
import Globe_ from 'react-globe.gl';

function Globe() {
  const locationData = [
    {
      lat: 35.3608368337679,
      lng: -80.19239471516728,
      size: 15,
      color: 'red',
      name: 'Red Wolf',
      index: '0',
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
  /**
   * The globe is sized by the box it is given, not by the window.
   *
   * It used to take `window.innerWidth * 0.35`, which has nothing to do with
   * how much room it actually has: dropped into the 256px column on
   * /experiences it drew itself 504px wide and pushed the document 88px past
   * the viewport, so every page carrying a globe scrolled sideways. Measuring
   * the host element means the canvas can never be wider than its parent.
   */
  const hostRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () => setWidth(Math.max(0, Math.floor(host.clientWidth)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

var marker_flag = false;
return <div ref={hostRef} className={`w-full bg-transparent flex justify-center items-center overflow-hidden`}>

    {width > 0 && <Globe_
    ref={handleGlobeReady}
    globeImageUrl={"//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"}
    /* Transparent, so the sphere sits on the page it is placed on. A solid
     * "#000" painted a black rectangle into every light section. */
    backgroundColor={"rgba(0,0,0,0)"}
    width={width}
    height={Math.round(width * 9 / 16)}
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
      <div id='info_panel_${d.index}' class='info-panel absolute top-[-5px] left-[20px] flex hidden flex-col md:min-w-[180px] max-md:min-w-[140px] rounded-lg p-3 space-y-2 max-md:space-y-1' style='background: var(--popover); color: var(--popover-foreground); border: 1px solid var(--border-strong)'>
        <p class='text-sm font-semibold'>${d.name}</p>
        <p class='text-xs' style='color: var(--muted-foreground)'>${d.location}</p>
        <a href='${d.link}' class='text-xs font-medium'>Learn more &rarr;</a>
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
    />}

</div>
}
export default Globe