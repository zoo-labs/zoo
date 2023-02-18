const AnimalInfo = ({ title, content }) => {
  return (
    <div className="px-2 py-6  lg:px-6 lg:basis-1/3 lg:bg-black100 lg:rounded-3xl">
      <h3 className="mb-4 text-xl font-bold ">{title}</h3>
      <p className="mb-3 text-grey text-opacity-70">
       {content}
      </p>
      <a href="" rel="noreferrer" className="text-green font-bold underline">
        Learn more
      </a>
    </div>
  );
};

export default AnimalInfo;
