import Image from 'next/image';
import Link from 'next/link';

function Intro({
  breadcrumbs,
  title,
  comment,
}: {
  breadcrumbs: string | String;
  title: string;
  comment?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-white py-16 md:py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <span>🌿</span>
                <span>Zoo Labs Foundation • 501(c)(3)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                <span>🐬</span>
                <span>ZenLM Ecological AI</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                <span>🔬</span>
                <span>Open Science</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-950 tracking-tight leading-[1.08] mb-6">
              {title}{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                Earth's Wildlife
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-700 font-medium leading-relaxed mb-8 max-w-2xl">
              {comment ||
                'Protecting endangered species through open-access research, bioacoustics, community field sanctuaries, and kid-friendly wildlife science.'}
            </p>

            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <Link
                href="/animals"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-lg shadow-md hover:shadow-lg transition-all"
              >
                <span>🐾 Explore 3D Animals</span>
                <span>→</span>
              </Link>
              <Link
                href="https://zoolabs.io"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white hover:bg-gray-50 text-gray-900 border-2 border-emerald-500 font-extrabold text-lg shadow-sm hover:shadow-md transition-all"
              >
                <span>🔬 Zoo Labs (zoolabs.io)</span>
                <span className="text-emerald-600">↗</span>
              </Link>
              <Link
                href="/donation"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-base transition-colors"
              >
                💚 Donate
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-gray-200/80 w-full max-w-xl text-left">
              <div>
                <p className="text-3xl font-black text-emerald-600">2.4M+</p>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-1">Hectares Protected</p>
              </div>
              <div>
                <p className="text-3xl font-black text-sky-600">130+</p>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-1">Research Papers</p>
              </div>
              <div>
                <p className="text-3xl font-black text-teal-600">100%</p>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-1">Non-Profit 501(c)(3)</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-sky-100 to-emerald-50 p-6">
                <Image
                  src="/images/giraffe.png"
                  alt="Endangered Nubian Giraffe"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="mt-4 p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Featured Species</p>
                    <p className="text-base font-extrabold text-gray-900">Nubian Giraffe</p>
                  </div>
                  <Link
                    href="/animals/nubian_giraffe"
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    View 3D Model →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
