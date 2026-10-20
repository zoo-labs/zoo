import Link from 'next/link';
import dynamic from "next/dynamic";

import React,{useState} from "react";
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const animals = [
  {
    usdz: "/models/Wolf/WOLF_ADULT.usdz",
    glb: "/models/Wolf/WOLF_ADULT.glb",
    url: "/animals/red_wolf",
    name: "Red Wolf",
    index: 0
  },
  {
    usdz: "/models/Giraffe/GIRAFFE_ADULT.usdz",
    glb: "/models/Giraffe/GIRAFFE_ADULT.glb",
    url: "/animals/nubian_giraffe",
    name: "Nubian Giraffe",
    index: 1
  },
  {
    usdz: "/models/Leopard/LEOPARD_ADULT.usdz",
    glb: "/models/Leopard/LEOPARD_ADULT.glb",
    url: "/animals/amur_leopard",
    name: "Amur Leopard",
    index: 2
  },
  {
    usdz: "/models/Elephant/ELEPHANT_ADULT.usdz",
    glb: "/models/Elephant/ELEPHANT_ADULT.glb",
    url: "/animals/sumatran_elephant",
    name: "Sumatran Elephant",
    index: 3
  },
  {
    usdz: "/models/Tiger/TIGER_ADULT.usdz",
    glb: "/models/Tiger/TIGER_ADULT.glb",
    url: "/animals/siberian_tiger",
    name: "Siberian Tiger",
    index: 4
  },
  {
    usdz: "/models/Hippo/HIPPO_ADULT.usdz",
    glb: "/models/Hippo/HIPPO_ADULT.glb",
    url: "/animals/pygmy_hippo",
    name: "Pygmy Hippo",
    index: 5
  },
  {
    usdz: "/models/Rhino/RHINO_ADULT.usdz",
    glb: "/models/Rhino/RHINO_ADULT.glb",
    url: "/animals/javan_rhino",
    name: "Javan Rhino",
    index: 6
  }
];

/** The order the chips are read in, which is not the order the models are indexed in. */
const order = [0, 1, 2, 5, 4, 3, 6];

function Header() {
  const [animal ,setAnimal] = useState(animals[3]);

  return (<>
    <div className="bg-background hidden md:block">
      <div className='flex items-center justify-between' style={{ paddingTop: 'var(--space-20)' }}>
        <div
          style={{
            flex: 7,
            paddingLeft: 'clamp(var(--space-8), 9vw, var(--space-32))',
            paddingRight: 'var(--space-8)',
            paddingBottom: 'var(--space-32)',
          }}
        >
            <h1 className='text-foreground md:text-7xl xl:text-9xl max-md:text-5xl max-md:my-5'>Animals we support.</h1>
        </div>
        <div style={{ flex: 5, aspectRatio: '1' }}>
            <ModelViewer
              usdz={animal.usdz}
              glb={animal.glb}
            ></ModelViewer>
        </div>
      </div>
      <div className='flex items-center justify-center flex-wrap gap-3 mt-8 px-4'>
        {order.map((i) => {
          const a = animals[i];
          const here = animal.index === a.index;
          return (
            <Link
              key={a.index}
              href={a.url}
              onMouseOver={() => setAnimal(a)}
              className='pill'
              style={{
                fontSize: 'var(--text-sm)',
                // The previewed animal is said in full-strength ink on a stronger
                // hairline. Both read the ground's own tokens, so the chip is
                // correct on paper and would be correct on the night.
                color: here ? 'var(--carbon)' : undefined,
                borderColor: here ? 'var(--border-strong)' : undefined,
              }}
            >
              {a.name}
            </Link>
          );
        })}
      </div>
    </div>
    <div className="bg-background md:hidden">
      <div className='w-full px-8' style={{ paddingTop: 'var(--space-20)' }}>
          <h1 className='text-foreground text-5xl py-6'>Animals we support.</h1>
      </div>
    </div>
    </>
  );
}

export default Header;
