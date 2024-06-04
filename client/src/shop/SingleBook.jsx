import React from "react";
import DetailsSection from "../components/single-product-page/DetailsSection";
import Slider from "../components/single-product-page/Slider";

import { useLoaderData, useParams } from "react-router-dom";

function SingleBook() {
  const { _id, productName, productImage, user } = useLoaderData();
  console.log(user, "user");
  return (
    <div className="flex flex-col md:flex-row md:px-0 md:gap-6 md:py-20 items-center md:justify-center lg:px-14 lg:mt-10 lg:gap-16">
      <Slider />
      <DetailsSection />
    </div>
  );
}

export default SingleBook;
