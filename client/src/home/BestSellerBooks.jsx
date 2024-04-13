import React, { useEffect, useState } from "react";
import BookCards from "../components/BookCards";

function BestSellerBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books/all-books")
      .then((response) => response.json())
      .then((data) => setBooks(data.books.slice(0, 8)));
  }, []);
  return (
    <div>
      <BookCards books={books} headline="Best Seller Books" />
    </div>
  );
}

export default BestSellerBooks;
