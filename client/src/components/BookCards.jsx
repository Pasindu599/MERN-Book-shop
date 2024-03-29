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

function BookCards({ headline, books }) {
  return (
    <div className="my-16 px-4 lg:px-24">
      <h2 className="text-5xl font-bold  text-black text-center my-5">
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
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper w-full h-full"
        >
          {books.map((book) => (
            <SwiperSlide key={book._id}>
              <div className="relative">
                <img key={book._id} src={book.bookImage} alt={book.title} />
                <div className="absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded">
                  <FaCartShopping className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <div>
                  <h3>{book.title}</h3>
                  <p>{book.authorName}</p>
                </div>
                <div>
                  <p>$10.00</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default BookCards;
