import React, { useContext } from "react";
import { useState } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";

import { AuthContext } from "../contexts/AuthProvider";

import { baseURL, assetsURL } from "../../constants";

function EditBooks() {
  const { id } = useParams();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const { token } = useContext(AuthContext);

  const {
    productName,
    description,

    normalPrice,
    salePrice,
    category,
    discount,
  } = useLoaderData();

  let productImage = useLoaderData().productImage;
  const categories = [
    "Electronic",
    "Clothing",
    "Books",
    "Shoes",
    "Jewelry",
    "Beauty",
    "Toys",

    "Home Appliances",
    "Furniture",
    "Others",
  ];

  const [selectedCategories, setSelectedCategories] = useState(category);

  const handleCategoryChange = (e) => {
    setSelectedCategories(e.target.value);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const imageInput = document.getElementById("productImage");
    console.log(imageInput.files, imageInput.files.length);

    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      const { url } = await fetch(`${assetsURL}/s3Url/upload-file`, {
        method: "GET",
      }).then((res) => res.json());

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      });
      productImage = url.split("?")[0];
      console.log(url.split("?")[0]);
    }

    const formData = e.target;

    const productName = formData.productName.value;
    const normalPrice = formData.normalPrice.value;

    const category = formData.categoryName.value;
    const description = formData.description.value;
    const discount = formData.discount.value;
    const salePrice = formData.salePrice.value;

    const productData = {
      productName,
      normalPrice,
      productImage,
      category,
      description,
      discount,
      salePrice,
    };
    console.log(productData);
    console.log(token);

    fetch(`${baseURL}/books/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    })
      .then((res) => {
        //check unauth
        if (res.status === 401) {
          alert("Unauthenticated");
          // go to login
          return navigate("/login", { replace: true });
        }
      })
      .then((data) => {
        console.log(data);
        formData.reset();
        alert("Product updated successfully");
        navigate("/admin/dashboard", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="px-4 my-12 ">
      <h2 className="mb-8 text-3xl font-bold">Update the Product</h2>
      <form
        onSubmit={handleUpdateProduct}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="productName" value="Product Name" />
            </div>
            <TextInput
              id="productName"
              name="productName"
              type="text"
              placeholder="Product name"
              required
              defaultValue={productName}
            />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="normalPrice" value="Normal Price" />
            </div>
            <TextInput
              id="normalPrice"
              name="normalPrice"
              type="text"
              placeholder="Normal Price"
              required
              defaultValue={normalPrice}
            />
          </div>
        </div>

        {/* second row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="productImage" value="Product Image" />
            </div>
            <input
              className="w-full rounded border border-gray-300"
              id="productImage"
              name="productImage"
              type="file"
              placeholder="Product Image"
            />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Category" />
            </div>
            <Select
              id="inputState"
              name="categoryName"
              className="w-full rounded"
              value={selectedCategories}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea
            id="description "
            name="description"
            placeholder="Write description..."
            required
            className="w-full"
            rows={4}
            defaultValue={description}
          />
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="discount" value="Discount" />
            </div>
            <TextInput
              id="discount"
              name="discount"
              type="text"
              placeholder="Discount"
              required
              defaultValue={discount}
            />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="salePrice" value="Sale Price" />
            </div>
            <TextInput
              id="salePrice"
              name="salePrice"
              type="text"
              placeholder="Sale Price"
              required
              defaultValue={salePrice}
            />
          </div>
        </div>

        <Button type="submit" className="mt-5">
          Update the Product
        </Button>
      </form>
    </div>
  );
}

export default EditBooks;
