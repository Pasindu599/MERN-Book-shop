import React, { useContext, useState, useEffect } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { AuthContext } from "../contexts/AuthProvider";
import { baseURL, assetsURL } from "../../constants";

function EditBooks() {
  const { id } = useParams();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { token } = useContext(AuthContext);

  const {
    productName: initialProductName,
    description: initialDescription,
    normalPrice: initialNormalPrice,
    salePrice: initialSalePrice,
    category: initialCategory,
    discount: initialDiscount,
  } = useLoaderData();

  const [productName, setProductName] = useState(initialProductName);
  const [description, setDescription] = useState(initialDescription);
  const [normalPrice, setNormalPrice] = useState(initialNormalPrice);
  const [salePrice, setSalePrice] = useState(initialSalePrice);
  const [category, setCategory] = useState(initialCategory);
  const [discount, setDiscount] = useState(initialDiscount);
  const [productImage, setProductImage] = useState(
    useLoaderData().productImage
  );

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedCategories(category);
  }, [category]);

  const handleCategoryChange = (e) => {
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

  const handleUpdateProduct = async (e) => {
    setIsLoading(true);
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
      setProductImage(url.split("?")[0]);
      console.log(url.split("?")[0]);
    }

    const productData = {
      productName,
      normalPrice,
      productImage,
      category: selectedCategories,
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
          setIsLoading(false);
          alert("Unauthenticated");
          // go to login
          return navigate("/login", { replace: true });
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        alert("Product updated successfully");
        navigate("/admin/dashboard/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && (
        <div className="px-4 my-12 text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}
      {!isLoading && (
        <div className="px-4 my-12">
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
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
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
                id="description"
                name="description"
                placeholder="Write description..."
                required
                className="w-full"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                  value={discount}
                  onChange={handleDiscountChange}
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
                  value={salePrice}
                  onChange={handleSalePriceChange}
                />
              </div>
            </div>

            <Button type="submit" className="mt-5">
              Update the Product
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditBooks;
