function Content({title,content}: {
    content: string;
    title: string;
  }) {
  return (
    <div className="bg-black xl:px-64 lg:px-36 md:px-16">
      <div className="flex max-md:flex-col max-md:px-4 justify-between py-20">
        <div className='relative md:w-1/2 max-md:w-full lg:pr-32 md:pr-16 max-md:pb-8'>
            <p className='text-white text-4xl '>{title}</p>
        </div>
        <div className='w-1/2 max-md:w-full flex justify-between space-x-16'>
            <p className='flex-1 text-white lg:text-xl md:text-md md:columns-2 gap-12'><span dangerouslySetInnerHTML={{__html: content}}/></p>
        </div>
      </div>
    </div>
  );
}

export default Content;
