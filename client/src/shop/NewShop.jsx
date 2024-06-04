import React, { useEffect } from "react";
import { useState } from "react";

import Sidebar from "../components/shop-page/slidebar/Sidebar";
import Searchbar from "../components/shop-page/slidebar/searchbar/Searchbar";
import Products from "../components/shop-page/products/Products";
import Card from "../components/Card";

import { baseURL } from "../../constants";

function NewShop() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    // console.log(selectedCategory);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) =>
      product.productName.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      console.log(selected);

      // if selected is  a list  of price
      if (selected.includes("-")) {
        const [min, max] = selected.split("-");

        filteredProducts = filteredProducts.filter(
          ({ salePrice }) =>
            salePrice >= Number(min) && salePrice <= Number(max)
        );
      } else {
        filteredProducts = filteredProducts.filter(
          ({ category, productName }) =>
            category === selected || productName === selected
        );
      }

      console.log(filteredProducts);
    }

    return filteredProducts.map(
      ({
        productImage,
        productName,
        normalPrice,
        salePrice,
        discount,
        _id,
      }) => (
        <Card
          key={Math.random()}
          img={productImage}
          title={productName}
          prevPrice={normalPrice}
          newPrice={salePrice}
          discount={discount}
          id={_id}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  useEffect(() => {
    fetch(`${baseURL}/books/all-books`)
      .then((response) => response.json())
      .then((data) => setProducts(data.books));
  }, []);

  return (
    <div className="mt-20 mb-10 px-4 lg:px-4 flex ">
      <Sidebar handleChange={handleChange} />
      <div className="flex  flex-col w-full">
        <Searchbar query={query} handleInputChange={handleInputChange} />
        <Products result={result} />
      </div>
    </div>
  );
}

export default NewShop;
