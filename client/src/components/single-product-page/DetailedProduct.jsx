import React from "react";
import { useLoaderData, useParams } from "react-router-dom";

function DetailedProduct() {
  const {
    _id,
    productName,
    productImage,
    category,
    description,
    salePrice,
    normalPrice,
    discount,
    user,
  } = useLoaderData();
  return (
    <div>
      {/* Subtitle */}
      <h2
        className="uppercase text-orange-500 mb-3 font-bold tracking-[0.13em] text-xs 
  md:text-base"
      >
        {category}
      </h2>
      {/* Product Name */}
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl mb-4 md:text-5xl md:mb-10">
          {productName}
        </h1>
        <p className="mb-5">{user.name}</p>
      </div>
      {/* Product Description */}
      <p className="text-black mb-5 text-sm leading-[22px] md:text-base">
        {description}
      </p>

      {/* Product Price */}
      <div className="flex items-center justify-between md:flex-col md:items-start mt-2">
        <div className="flex gap-4 items-center">
          {/* Price */}
          <span className="font-bold text-2xl">Rs. {salePrice}</span>
          {/* Discount */}
          <span className="bg-orange-200 text-orange-500 font-bold text-sm px-2 rounded-md">
            {discount}% off
          </span>
        </div>
        {/* Previous price */}
        <span className="text-blue-800 text-sm font-bold">
          <del>Rs. {normalPrice}</del>
        </span>
      </div>
    </div>
  );
}

export default DetailedProduct;
