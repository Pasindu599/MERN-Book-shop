import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";

import { baseURL, assetsURL } from "../../constants";

function UploadBook() {
  const from = location.state?.from?.pathname || "/";
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  console.log(user);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

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

  const [selectedCategories, setSelectedCategories] = useState(categories[0]);

  const handleCategoryChange = async (e) => {
    setSelectedCategories(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const imageInput = document.getElementById("productImage");
    const file = imageInput.files[0];
    const { url } = await fetch(`${assetsURL}/s3Url/upload-file/`, {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const productImage = url.split("?")[0];

    const formData = e.target;

    const productName = formData.productName.value;
    const normalPrice = formData.normalPrice.value;

    const category = formData.categoryName.value;
    const description = formData.description.value;
    const discount = formData.discount.value;
    const salePrice = formData.salePrice.value;

    const productData = {
      productName,
      description,
      productImage,
      normalPrice,
      salePrice,
      discount,
      category,
      email,
    };
    console.log(productData);

    fetch(`${baseURL}/books/upload-book`, {
      method: "POST",
      body: JSON.stringify(productData),
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Unauthorized");
          navigate("/login", { replace: true });
        }
      })
      .then((data) => {
        // console.log(data);
        formData.reset();
        alert("Product uploaded successfully");
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <div className="px-4 my-12 ">
      <h2 className="mb-8 text-3xl font-bold">Upload A Product</h2>
      <form
        onSubmit={handleSubmit}
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
              required
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
          />
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="discount" value="Discount(%)" />
            </div>
            <TextInput
              id="discount"
              name="discount"
              type="text"
              placeholder="Discount"
              required
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
            />
          </div>
        </div>

        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload Product
        </Button>
      </form>
    </div>
  );
}

export default UploadBook;
