import React, { useEffect, useState } from "react";

function FavouriteBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return <div>FavouriteBooks</div>;
}

export default FavouriteBooks;
