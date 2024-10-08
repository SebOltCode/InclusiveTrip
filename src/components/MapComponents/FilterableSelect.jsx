import React, { useState } from "react";

const FilterableSelect = ({ items, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    onSelect(item);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-64">
      <button
        className="btn w-full px-4 py-2 bg-yellow-400  border-black rounded-lg shadow-sm focus:outline-none focus:ring-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue ? selectedValue.name : "Auswählen"}
      </button>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <input
            type="text"
            className="w-full px-4 py-2 border-b border-gray-300 rounded-t-lg focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  <span>{item.name}</span>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No items found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterableSelect;
