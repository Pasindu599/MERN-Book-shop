import React, { useEffect, useState } from "react";
import DetailsSection from "../components/single-product-page/DetailsSection";
import Slider from "../components/single-product-page/Slider";

import { useLoaderData, useParams } from "react-router-dom";

function SingleBook() {
  const { _id, productName, productImage, user } = useLoaderData();
  console.log(user, "user");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/user/${user}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data, "API response"); // Log the entire response
        if (data.user) {
          setOwner(data.user);
          console.log(data.user, "data.user");
        } else {
          console.error("User data not found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchOwnerData();
    } else {
      console.error("No user id provided");
    }
  }, [user]);

  console.log(owner, "owner");
  return (
    <div className="flex flex-col md:flex-row md:px-0 md:gap-6 md:py-20 items-center md:justify-center lg:px-14 lg:mt-10 lg:gap-16">
      <Slider />
      <DetailsSection
        username={owner.name || "Owner Name"}
        email={owner.userEmail || "Owner Email"}
        phone={owner.mobile || "Owner Phone"}
      />
    </div>
  );
}

export default SingleBook;
