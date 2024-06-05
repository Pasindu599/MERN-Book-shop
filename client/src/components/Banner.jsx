import React from "react";
import BannerCard from "../home/BannerCard";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="px-4 lg:px-24 bg-orange-100 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
        <div className="md:w-1/2 space-y-8 h-full">
          <h2 className="text-5xl font-bold leading-snug text-black">
            Buy and Sell Your Products{" "}
            <span className="text-orange-700">for the Best Prices</span>
          </h2>
          <p>
            Welcome to YardSale, your one-stop destination for posting and
            finding yard sales in your community. Whether you're looking to
            declutter your home, find a great bargain, or connect with your
            neighbors, YardSale makes it easy and fun!
          </p>

          {/* <input
              type="search"
              name="search"
              id="search"
              placeholder="Search for products"
              className="py-2 px-2 rounded-s-sm outline-none"
            /> */}
          <Link to="/shop" className="block">
            <button className="bg-orange-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-500">
              Go to the shop
            </button>
          </Link>
        </div>

        <BannerCard />
      </div>
    </div>
  );
}

export default Banner;
