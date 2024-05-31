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

function ProductCards({ headline, products }) {
  return (
    <div className="my-16 px-4 lg:px-24">
      <h2 className="text-5xl font-bold  text-orange-800 text-center my-5">
        {headline}
      </h2>
      <div className="mt-12">
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
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper w-full h-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <Link to={`/book/${product._id}`} key={product._id}>
                <div className="relative">
                  <img
                    className="w-full h-96 object-cover rounded-lg"
                    key={product._id}
                    src={product.productImage}
                    alt={product.productName}
                  />
                  <div className="absolute top-3 right-3 bg-orange-600 hover:bg-black p-2 rounded">
                    <FaCartShopping className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex flex-col w-ful ">
                  <div>
                    <h3 className="text-xl font-bold text-center text-orange-700">
                      {product.productName}
                    </h3>
                  </div>
                  <div>
                    <p className="text-center text-orange-500 font-semibold">
                      {" "}
                      Rs. {product.salePrice}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ProductCards;
