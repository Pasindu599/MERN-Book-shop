import React from "react";
import { Link } from "react-router-dom";
import bookPic from "../assets/awardbooks.png";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";

function PromoBanner() {
  const { user } = useContext(AuthContext);
  return (
    <div className="mt-16 py-12 bg-orange-100 px-4 lg:px-24">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-6 loading-snug">
            Hurry Up.... Sell and Buy Your Products Online
          </h2>
          {!user && (
            <Link to="/sign-up" className="block">
              <button className="bg-orange-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300">
                Sign Up Now
              </button>
            </Link>
          )}
        </div>

        <div>
          <img src={bookPic} alt="award books" className="w-96" />
        </div>
      </div>
    </div>
  );
}

export default PromoBanner;
