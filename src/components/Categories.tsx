
const Categories = () => {
  const testCategories = [
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Technology",
    },
    {
      id: 3,
      name: "Business",
    },
    {
      id: 4,
      name: "Entertainment",
    },
    {
      id: 5,
      name: "Health",
    },
    {
      id: 6,
      name: "Sports",
    },
    {
      id: 7,
      name: "Business",
    },


  ];
  return <div className="flex gap-2 px-3">{
    testCategories.map((category) => (
      <div
        key={category.id}
        className="py-2 px-3 rounded-xl bg-secondary text-white hover:bg-white hover:text-black text-sm transition-colors duration-300"
      >
        {category.name}
      </div>
    ))
  }</div>;
};

export default Categories;
