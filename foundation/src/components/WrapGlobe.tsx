import dynamic from 'next/dynamic';

const WrapGlobe = dynamic(import('@/components/Globe'), { ssr: false });

export default WrapGlobe;