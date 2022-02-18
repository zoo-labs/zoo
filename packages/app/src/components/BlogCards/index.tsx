import Article from "components/blog/articles";

const BlogCards = ({data}:any) => {
	return (
		<section className="pb-16 px-6 lg:max-w-7xl lg:mx-auto ">
        <div className="flex flex-col items-center mb-16 lg:grid lg:grid-cols-3 lg:place-items-stretch lg:gap-12 ">
          {data.map((article) => (
            <Article article={article} key={article.name} />
          ))}
        </div>
        <div className="flex justify-center">
          <a
            href="https://zoolabsofficial.medium.com/"
            target="_blank"
            rel="noreferrer"
            className="border border-green text-green text-sm md:text-base font-semibold px-8 py-3 md:px-6 lg:px-16 rounded-full hover:cursor-pointer"
          >
            Zoo Medium Page
          </a>
        </div>
      </section>
	)
}

export default BlogCards;