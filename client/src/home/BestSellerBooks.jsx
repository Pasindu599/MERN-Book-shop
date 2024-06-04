import React, { useEffect, useState } from "react";
import ProductCards from "../components/ProductCards";

import { baseURL } from "../../constants";

function BestSellerBooks() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${baseURL}/books/all-books`)
      .then((response) => response.json())
      .then((data) => setProducts(data.books.slice(0, 8)));
  }, []);
  return (
    <div>
      <ProductCards products={products} headline="Best Products" />
    </div>
  );
}

export default BestSellerBooks;
