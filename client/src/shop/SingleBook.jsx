import React from "react";
import { useLoaderData, useParams } from "react-router-dom";

function SingleBook() {
  const { _id, title, bookImage } = useLoaderData();

  return (
    <div className="mt-28 px-4 lg:px-24">
      <img src={bookImage} alt={title} className="h-96" />
      <h2>{title}</h2>
    </div>
  );
}

export default SingleBook;
