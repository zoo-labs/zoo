import Image from 'next/image';
import Link from 'next/link';
import ProgressBar from "@ramonak/react-progress-bar";
function Aiding() {
  return (
    <section className="bg-gray-50 py-24 border-b border-gray-200">
      <div className='max-w-6xl mx-auto px-6 flex flex-col'>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            Digital Conservation
          </span>
          <h2 className='text-3xl md:text-5xl font-black text-gray-900'>Aiding Species with Digital Twins & 3D</h2>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            Intellectually stimulating 3D and educational content for children, students, and wildlife lovers to experience endangered animals up close.
          </p>
        </div>
        <div className='grid md:grid-cols-2 gap-8 text-gray-700 text-lg leading-relaxed'>
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-xl text-gray-900 mb-2">Philanthropic Support</h3>
            <p>Our endeavors are made possible through philanthropic grants, donations, and educational awareness programs worldwide.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-xl text-gray-900 mb-2">Kid & Family Education</h3>
            <p>We are developing interactive experiences with our Zoo Animals, aimed at lasting educational impact, empathy for wildlife, and conservation awareness.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aiding;
