import { useEffect } from "react";
import { useState } from "react";
import { Card } from "flowbite-react";

export default function Shop() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/books/all-books")
      .then((response) => response.json())
      .then((data) => setBooks(data.books));
  }, []);
  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-5xl font-bold text-center">All books are here </h2>
      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {books.map((book) => (
          <Card>
            <img src={book.bookImage} alt="" className="h-96" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {book.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {book.author}
            </p>

            <button className="bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300">Buy Now</button>
          </Card>
        ))}
      </div>
    </div>
  );
}
