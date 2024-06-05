import React from "react";
import "./Searchbar.css";

function Searchbar({ handleInputChange, query }) {
  return (
    <div className="ml-10 border-b-2 pb-2 ">
      <input
        className="search-input items-center justify-center w-96 h-10 px-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type="text"
        placeholder="Search for products"
        onChange={handleInputChange}
        value={query}
      />
    </div>
  );
}

export default Searchbar;
