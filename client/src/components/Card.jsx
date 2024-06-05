import React from "react";
import { BiRightArrow, BiRightArrowAlt } from "react-icons/bi";

function Card({ img, title, prevPrice, newPrice, discount, id }) {
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN").format(number);
  };
  return (
    <div class="relative m-5 h-[500px] flex  w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md justify-between">
      <a
        class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href={`/book/${id}`}
      >
        <img class="object-cover" src={img} alt="product image" />
        <span class="absolute top-0 left-0 m-2 rounded-full bg-orange-500 px-2 text-center text-sm font-medium text-white">
          {discount === 0 ? "" : `${discount}% Off`}
        </span>
      </a>
      <div class="mt-4 px-5 pb-5">
        <a href="#">
          <h5 class="text-xl tracking-tight text-slate-900">{title}</h5>
        </a>
        <div class="mt-2 mb-5  items-center justify-between">
          <div class="text-3xl font-bold text-slate-900">
            Rs. {formatNumber(newPrice)}
          </div>
          <div class="text-sm text-slate-900 line-through">
            {newPrice === prevPrice ? "" : "Rs. " + formatNumber(prevPrice)}
          </div>
        </div>

        <a
          href={`/book/${id}`}
          class="flex items-center justify-center rounded-md bg-orange-500 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg> */}
          See More
          <BiRightArrowAlt className="ml-2" />
        </a>
      </div>
    </div>
  );
}

export default Card;
