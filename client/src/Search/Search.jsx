import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Name');
    const categories = [
        { value: 'Name', label: 'Name' },
        { value: 'Skill', label: 'Skill' },
        { value: 'Location', label: 'Location' },
        { value: 'Experience', label: 'Experience' },
    ];

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(`Searching for ${searchTerm} in ${selectedCategory}`);
    };

    return (
        <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white space-x-4 p-2 rounded-full border-2 border-black/75 max-w-3xl w-full mx-auto"
        >
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="flex-1 py-3 px-4 rounded-l-md focus:outline-none"
                placeholder={`Search by ${categories.find(cat => cat.value === selectedCategory).label}`}
            />
            <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="py-3 px-4 border-l-0 focus:outline-none cursor-pointer"
            >
                {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className="bg-purple-700 text-white py-3 text-2xl px-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-800"
            >
                <IoSearch />
            </button>
        </form>
    );
}
