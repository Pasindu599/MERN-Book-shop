import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

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
  const { user, token } = useContext(AuthContext);

  const navigate = useNavigate();

  console.log(user);

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState("");

  const [normalPrice, setNormalPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [salePrice, setSalePrice] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }

    fetch(`${baseURL}/users/user-email/${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setMobile(data.user.mobile);
      });
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

  const handleNormalPriceChange = (e) => {
    const value = e.target.value;
    setNormalPrice(value);
    if (discount) {
      const sale = value - (value * discount) / 100;
      setSalePrice(sale.toFixed(0));
    }
  };

  const handleDiscountChange = (e) => {
    const value = e.target.value;
    setDiscount(value);
    if (normalPrice) {
      const sale = normalPrice - (normalPrice * value) / 100;
      setSalePrice(sale.toFixed(0));
    }
  };

  const handleSalePriceChange = (e) => {
    const value = e.target.value;
    setSalePrice(value);
    if (normalPrice) {
      const discountValue = ((normalPrice - value) / normalPrice) * 100;
      setDiscount(discountValue.toFixed(0));
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (mobile) {
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
      // const normalPrice = formData.normalPrice.value;

      const category = formData.categoryName.value;
      const description = formData.description.value;
      // const discount = formData.discount.value;
      // const salePrice = formData.salePrice.value;

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
            setIsLoading(false);
            alert("Unauthorized");
            navigate("/login", { replace: true });
          }
        })
        .then((data) => {
          // console.log(data);

          formData.reset();
          setNormalPrice("");
          setDiscount("");
          setSalePrice("");
          setIsLoading(false);
          navigate("/admin/dashboard", { replace: true });
        })
        .catch((err) => {
          setIsLoading(false);
          alert("Something went wrong");
          console.log(err);
        });
    } else {
      setIsLoading(false);
      alert("Please update your profile to upload a product");
      navigate("/admin/dashboard/profile", { replace: true });
    }
  };
  console.log(mobile, "mobile");
  return (
    <>
      {isLoading && (
        <div className="px-4 my-12 text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}
      {!isLoading && (
        <div className="px-4 my-12 ">
          <h2 className="mb-8 text-3xl font-bold">Upload A Product</h2>

          {!mobile && (
            <h3 className="text-red-500">
              Please enter your phone number. You can't enter a product now.
              <Link
                to="/admin/dashboard/profile"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Update Your Profile
              </Link>
            </h3>
          )}
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
                  <Label htmlFor="normalPrice" value="Normal Price(Rs.)" />
                </div>
                <TextInput
                  id="normalPrice"
                  name="normalPrice"
                  type="text"
                  placeholder="Normal Price(Rs.)"
                  required
                  value={normalPrice}
                  onChange={handleNormalPriceChange}
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
                  placeholder="Discount(%)"
                  required
                  value={discount}
                  onChange={handleDiscountChange}
                />
              </div>
              <div className="lg:w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="salePrice" value="Sale Price(Rs.)" />
                </div>
                <TextInput
                  id="salePrice"
                  name="salePrice"
                  type="text"
                  placeholder="Sale Price(Rs.)"
                  required
                  value={salePrice}
                  onChange={handleSalePriceChange}
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
      )}
    </>
  );
}

export default UploadBook;
