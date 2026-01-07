import { testCategories } from "../constants/data";

const Categories = () => {

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
