import React, { useEffect, useState } from "react";
import BookCards from "../components/BookCards";

function FavouriteBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books/all-books")
      .then((response) => response.json())
      .then((data) => setBooks(data.books));
  }, []);
  return (
    <div>
      <BookCards books={books} headline="Best Seller Books" />
    </div>
  );
}

export default FavouriteBooks;
