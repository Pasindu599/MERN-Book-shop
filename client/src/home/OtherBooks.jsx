import React, { useEffect, useState } from "react";
import ProductCards from "../components/ProductCards";

function OtherBooks() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books/all-books")
      .then((response) => response.json())
      .then((data) => setProducts(data.books.slice(0, 8)));
  }, []);
  return (
    <div>
      <ProductCards products={products} headline="Best Products" />
    </div>
  );
}

export default OtherBooks;
