import React, { useEffect, useState } from "react";
import ProductCards from "../components/ProductCards";

import { baseURL } from "../../constants";
import CategoryCard from "../components/CategoryCard";

function AllCategories() {
  const categories = [
    {
      categoryName: "Electronic",
      categoryImage:
        "https://th.bing.com/th/id/OIP.vOCL-Bb4dRTjSAFrWkVplgHaEK?w=1280&h=720&rs=1&pid=ImgDetMain",
    },
    {
      categoryName: "Clothing",
      categoryImage:
        "https://th.bing.com/th/id/R.ddbfcd34f28ce752a774ba2ae575f9d9?rik=7FQbEic5cCdbBA&pid=ImgRaw&r=0",
    },
    {
      categoryName: "Books",
      categoryImage:
        "https://th.bing.com/th/id/R.068f8744ba043b46a14d30ebf026e92f?rik=J4NeRZc%2fIAPwLg&pid=ImgRaw&r=0",
    },
    {
      categoryName: "Shoes",
      categoryImage:
        "https://th.bing.com/th/id/R.3393250cd235c9f7170b11e3c5f87935?rik=LaaDaSIUVjsYPA&pid=ImgRaw&r=0",
    },
    {
      categoryName: "Jewelry",
      categoryImage:
        "https://th.bing.com/th/id/OIP.qtMqznA0ya7-5P57woehaQHaE9?rs=1&pid=ImgDetMain",
    },
    {
      categoryName: "Beauty",
      categoryImage:
        "https://th.bing.com/th/id/R.e69e1ed30a8f1641256f82306154838f?rik=UzpkWctwbJijAg&pid=ImgRaw&r=0",
    },
    {
      categoryName: "Toys",
      categoryImage:
        "https://th.bing.com/th/id/OIP.UKj0J592yVxjbqnr960fAgHaEO?rs=1&pid=ImgDetMain",
    },
    {
      categoryName: "Home Appliances",
      categoryImage:
        "https://th.bing.com/th/id/OIP.64MqnzQXmWl73d_8gS0tEwAAAA?rs=1&pid=ImgDetMain",
    },
    {
      categoryName: "Furniture",
      categoryImage:
        "https://th.bing.com/th/id/OIP.DQAN0JQYCwPa03VqnZuf3QAAAA?rs=1&pid=ImgDetMain",
    },
    {
      categoryName: "Others",
      categoryImage:
        "https://th.bing.com/th/id/R.7ff0a0e5aa32187d7acc6df1a55406e7?rik=fD4hLFzAvJYeUw&pid=ImgRaw&r=0&sres=1&sresct=1",
    },
  ];

  return (
    <div>
      {/* <ProductCards products={categories} headline="Best Products" /> */}
      <CategoryCard categories={categories} headline="All Categories" />
    </div>
  );
}

export default AllCategories;
