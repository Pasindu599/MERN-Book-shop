import React from "react";
import DetailedProduct from "./DetailedProduct";
import CTASection from "./CTASection";
import { HiChat } from "react-icons/hi";
import ReactWhatsapp from "react-whatsapp";

function DetailsSection({ username, email, phone }) {
  console.log(username, email, phone);
  return (
    <div className="flex flex-col p-6 gap-3 md:w-full md:max-w-[600px]">
      <DetailedProduct username={username} />
      {/* <CTASection props={props} /> */}

      <ReactWhatsapp
        number={phone}
        message="Hi, I am interested on your product."
        className="w-full text-left"
      >
        <button
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold 
    shadow-[0_10px_30px_-12px] shadow-orange-500 md:w-2/3"
        >
          <div className="flex gap-4 justify-center text-lg">
            <HiChat className="text-3xl" />
            Chat
          </div>
        </button>
      </ReactWhatsapp>
    </div>
  );
}

export default DetailsSection;
