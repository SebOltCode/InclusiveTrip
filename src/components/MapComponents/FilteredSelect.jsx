import React, { useState } from 'react';

const FilteredSelect = ({ options, selectedValue, onSelect }) => {
    const [filter, setFilter] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="absolute">
            <input
                type="text"
                placeholder="Filter options..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 100)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.length === 0 ? (
                        <li className="p-2 text-gray-500">No options found</li>
                    ) : (
                        filteredOptions.map(option => (
                            <li
                                key={option.id}
                                onClick={() => {
                                    onSelect(option);
                                    setFilter(option.name);
                                    setIsOpen(false);
                                }}
                                className={`p-2 cursor-pointer hover:bg-gray-200 ${option.id === selectedValue ? 'bg-blue-100' : ''
                                    }`}
                            >
                                {option.name}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default FilteredSelect;
