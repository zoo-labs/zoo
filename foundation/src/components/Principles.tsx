import Link from 'next/link';
function Principles() {
  const principles = [
    { icon: "🐾", title: "Promote Wildlife Conservation", desc: "Protecting endangered fauna and pristine wilderness through hands-on field intervention." },
    { icon: "🎓", title: "Educate Young Minds", desc: "Inspiring kids and students everywhere with 3D models, field expeditions, and open research." },
    { icon: "🔬", title: "Deploy Ecological AI & Sensors", desc: "Bioacoustic monitoring, satellite tracking, and edge computer vision to stop poaching." },
    { icon: "🤝", title: "Community-Led Stewardship", desc: "Partnering directly with local indigenous populations and wildlife sanctuaries." },
    { icon: "🌱", title: "Harmonious Coexistence", desc: "Creating sustainable corridors and regenerative ecosystems for future generations." },
  ];

  return (
    <section className="bg-white py-24 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-4">
          ✨ Our Guiding Values
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          The Principles That Drive <span className="text-emerald-600 underline decoration-emerald-300">Us</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
          A modern non-profit research foundation uniting animal lovers, families, scientists, and AI researchers.
        </p>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-14 text-left">
          {principles.map((p, idx) => (
            <div key={idx} className="bg-emerald-50/40 p-8 rounded-3xl border border-emerald-100/80 hover:border-emerald-300 hover:shadow-md transition-all">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-3xl text-white flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-3xl">🚀</span>
              <h3 className="text-2xl font-extrabold mt-3">Join The Expedition</h3>
              <p className="text-emerald-100 text-sm mt-2">
                Help us protect wildlife with science, donations, or volunteering.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                href="/donation"
                className="bg-white text-emerald-900 hover:bg-emerald-50 px-5 py-2.5 rounded-xl font-bold text-sm text-center transition-colors"
              >
                Donate
              </Link>
              <Link
                href="https://zoolabs.io"
                className="bg-emerald-800/80 hover:bg-emerald-900 text-white border border-emerald-400/40 px-5 py-2.5 rounded-xl font-bold text-sm text-center transition-colors"
              >
                🔬 Zoo Labs ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Principles;
