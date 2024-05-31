import React from "react";
// import { Carousel } from "./Carousel";
// import productImage from "../../assets/single-product/image-product-1.jpg";

import { useLoaderData, useParams } from "react-router-dom";

function Slider() {
  const { _id, title, productImage } = useLoaderData();
  return (
    <div className="relative md:w-full md:max-w-[500px]">
      <img src={productImage} alt={title} className="w-full" />
    </div>
  );
}

export default Slider;
