import React from "react";

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

function CategoryCard({ headline, categories }) {
  return (
    <div className="my-10 px-4 lg:px-24">
      <h2 className="text-5xl font-bold  text-orange-800 text-center mt-5">
        {headline}
      </h2>
      <div className="">
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
          className="mySwiper w-full h-full "
        >
          {categories.map((product) => (
            <SwiperSlide key={Math.random()} className="mb-10">
              <Link to={`/shop/all`}>
                <article class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-10 h-[300px]">
                  <img
                    src={product.categoryImage}
                    alt="University of Southern California"
                    class="absolute inset-0 h-full w-full object-cover"
                  />
                  <div class="absolute   inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                  <h3 class="absolute bottom-3  z-10 mt-3 text-3xl font-bold text-white">
                    {product.categoryName}
                  </h3>
                  <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300"></div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CategoryCard;
