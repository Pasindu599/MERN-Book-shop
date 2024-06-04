import { useEffect } from "react";
import { useState } from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

import { baseURL } from "../../constants";

export default function Shop() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`${baseURL}/books/all-books`)
      .then((response) => response.json())
      .then((data) => setProducts(data.books));
  }, []);
  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-5xl font-bold text-center">All books are here </h2>
      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {products.map((product) => (
          <Card key={product.id}>
            <img src={product.productImage} alt="" className="h-96" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.productName}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Rs. {product.salePrice}
            </p>
            <Link to={`/book/${product._id}`}>
              <button className="bg-orange-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300">
                See More
              </button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
