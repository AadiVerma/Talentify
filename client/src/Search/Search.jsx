import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/talents`,{
        state:{
            searchQuery1:searchTerm,
        }
    })
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
        placeholder={`Search by Name or Skill`}
      />
      <button
        type="submit"
        className="bg-purple-700 text-white py-3 text-2xl px-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-800"
      >
        <IoSearch />
      </button>
    </form>
  );
}
