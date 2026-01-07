import { useState, useRef, useEffect } from "react";
import { testCategories } from "../constants/data";
import { FiChevronDown, FiX } from "react-icons/fi";

type CategorySelectionProps = {
  selectedCategories: number[];
  onChange: (categories: number[]) => void;
};

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategories,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = testCategories.filter((cat) => cat.name !== "All");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onChange([...selectedCategories, categoryId]);
    }
  };

  const removeCategory = (categoryId: number) => {
    onChange(selectedCategories.filter((id) => id !== categoryId));
  };

  const getSelectedCategoryNames = () => {
    return categories
      .filter((cat) => selectedCategories.includes(cat.id))
      .map((cat) => cat.name);
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Categories
      </label>

      {/* Selected categories pills */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {getSelectedCategoryNames().map((name) => {
            const category = categories.find((cat) => cat.name === name);
            return (
              <div
                key={category?.id}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                <span>{name}</span>
                <button
                  type="button"
                  onClick={() => removeCategory(category!.id)}
                  className="hover:bg-blue-200 rounded-full p-0.5 transition"
                >
                  <FiX size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
      >
        <span className="text-gray-700">
          {selectedCategories.length === 0
            ? "Select categories"
            : `${selectedCategories.length} selected`}
        </span>
        <FiChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <div
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${
                  isSelected ? "bg-blue-50" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={isSelected ? "text-blue-700 font-medium" : ""}>
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategorySelection;
