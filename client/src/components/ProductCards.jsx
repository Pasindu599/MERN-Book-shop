import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Card from "./Card";

function ProductCards({ headline, products }) {
  return (
    <div className="my-16 px-4 lg:px-24">
      <h2 className="text-5xl font-bold  text-orange-800 text-center my-5">
        {headline}
      </h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper w-full h-fill "
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="mb-10 ">
              <Link to={`/book/${product._id}`} key={product._id}>
                <Card
                  img={product.productImage}
                  title={product.productName}
                  prevPrice={product.normalPrice}
                  newPrice={product.salePrice}
                  discount={product.discount}
                  id={product.id}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* 
        <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
          {products.map(
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
          )} */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default ProductCards;
