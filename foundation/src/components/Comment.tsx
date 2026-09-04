import Link from 'next/link';
function Comment() {
    const comments = [
        {
          title: "100+",
          comment: "It's estimated that 100 African elephants are killed each day by poachers.",
          link: "Endangered Elephants",
          href: "/animals/sumatran_elephant"
        },
        {
          title: "$23B",
          comment: "One of the most illicit markets in the world, illegal wildlife trade is worth $7- $23 billion annually.",
          link: "Animals We Support",
          href: "/collect"
        },
        {
          title: "18.7M",
          comment: "Annually, 18.7M acres of forest loss affects 80% of terrestrial species' habitats.",
          link: "Deforestation",
          href: "/getinvolved#ground_activity"
        },
        {
          title: "38,000+",
          comment: "Over 38,000 species (27% of assessed) are threatened with extinction.",
          link: "Donate",
          href:"/donation"
        }
      ];
  return (
    <section className="bg-gray-50 py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            🌍 Global Biodiversity Crisis & Action
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Every Creature Matters</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Our mission uses real science, DeSci grants, and AI monitoring to protect endangered wildlife before it is too late.
          </p>
        </div>
        <div className='grid md:grid-cols-4 grid-cols-1 gap-6'>
        {comments.map((data, index) => (
          <div key={index} className='bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between'>
              <div>
                <h3 className='text-emerald-600 font-extrabold text-4xl lg:text-5xl tracking-tight'>{data.title}</h3>
                <p className='text-gray-700 text-base lg:text-lg py-6 leading-relaxed'>{data.comment}</p>
              </div>
              <Link href={data.href} className='inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 group text-base' >
                <span>{data.link}</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

export default Comment;