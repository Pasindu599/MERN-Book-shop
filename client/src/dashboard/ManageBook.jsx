import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import { AuthContext } from "../contexts/AuthProvider";

import { baseURL } from "../../constants";

function ManageBook() {
  const { user, token } = useContext(AuthContext);
  console.log(user);

  const [allProducts, setAllProducts] = useState([]);

  const handleDelete = (product_id) => {
    fetch(`${baseURL}/books/book/${product_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Product deleted successfully");
        console.log(data);
        setAllProducts(
          allProducts.filter((product) => product._id !== product_id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!user) return;
    const userEmail = user.email;

    fetch(`${baseURL}/users/products/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
      });
  }, [user]);
  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manage Your Products</h2>

      <Table className="lg:w-[1180px]">
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Normal Price</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Sale Price</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit or Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {allProducts.map((product, index) => (
          <Table.Body className="divide-y" key={product._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {product.productName}
              </Table.Cell>
              <Table.Cell>{product.normalPrice}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>{product.salePrice}</Table.Cell>
              <Table.Cell>
                <Link
                  to={`/admin/dashboard/edit-books/${product._id}`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
}

export default ManageBook;
