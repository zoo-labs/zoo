import Link from 'next/link';
function TradingCard() {
  return (
    <div
      className="bg-background xl:px-32 lg:px-32 md:px-16 px-4"
      style={{ paddingBottom: 'clamp(var(--space-12), 10vw, var(--space-32))' }}
    >
      <h1 className='text-foreground max-md:text-3xl md:hidden pb-6'>Select any trading card to start learning.</h1>
      <div className="flex items-center justify-between" style={{ flexDirection: 'row-reverse', paddingTop: 'var(--space-20)' }}>
        <div style={{ flex: 1, paddingLeft: 'clamp(var(--space-4), 4vw, var(--space-32))' }}>
            <Link href="/animals/amur_leopard">
              <video autoPlay loop muted playsInline className="w-full border rounded-xl p-1" style={{ aspectRatio: '473 / 833' }} >
                <source src="/videos/Leopard_Card_Front.webm"  type="video/webm"/>
                <source src="/videos/Leopard_Card_Front.mp4"  type="video/mp4"/>
              </video>
            </Link>
        </div>
        <div className='flex flex-col justify-between' style={{ flex: 1 }}>
            <h1 className='text-foreground hidden md:block md:text-5xl xl:text-6xl pb-12'>Select any trading card to start learning.</h1>
            <p className='text-foreground text-lg md:text-xl pb-12'>Discover our vibrant, fact-packed Zoo trading cards – a virtual treasure trove of animal knowledge and endangered species insights!</p>

            <Link href='/animals/amur_leopard'  className='flex items-center gap-2 mt-4 cursor-pointer text-foreground text-sm'>
              <>
                <span>View Amur Leopard</span>
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path fillRule="evenodd" clipRule="evenodd" d="M6 5.5L1.19924 10.5L0 9.24901L3.59962 5.5L6.08905e-06 1.751L1.19924 0.5L6 5.5Z" fill="currentColor"/>
                </svg>
              </>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default TradingCard;
