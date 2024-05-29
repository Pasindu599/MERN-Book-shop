import React from "react";
import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
function EditBooks() {
  const { id } = useParams();
  const { title, description, bookImage, authorName, price, category, pdfURL } =
    useLoaderData();
  const categories = [
    "Action",
    "Adventure",
    "Biography",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Historical",
    "Horror",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
    "Western",
  ];

  const [selectedCategories, setSelectedCategories] = useState(category);

  const handleCategoryChange = (e) => {
    setSelectedCategories(e.target.value);
  };

  const handleUpdateBook = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const formData = e.target;

    const title = formData.title.value;
    const authorName = formData.authorName.value;
    const bookImage = formData.bookImage.value;
    const category = formData.categoryName.value;
    const description = formData.description.value;
    const pdfURL = formData.pdfURL.value;
    const price = 100;

    const bookData = {
      title,
      description,
      bookImage,
      authorName,

      category,

      pdfURL,
      price,
    };
    console.log(bookData);

    fetch(`http://localhost:5000/api/books/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Book updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="px-4 my-12 ">
      <h2 className="mb-8 text-3xl font-bold">Update the Book</h2>
      <form
        onSubmit={handleUpdateBook}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="title" value="Book Title" />
            </div>
            <TextInput
              id="title"
              name="title"
              type="text"
              placeholder="Book title"
              required
              defaultValue={title}
            />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput
              id="authorName"
              name="Author Name"
              type="text"
              placeholder="Author name"
              required
              defaultValue={authorName}
            />
          </div>
        </div>

        {/* second row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="bookImage" value="Book Image" />
            </div>
            <TextInput
              id="bookImage"
              name="bookImage"
              type="text"
              placeholder="Book Image"
              required
              defaultValue={bookImage}
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="pdfURL" value="Book pdf URL" />
          </div>
          <TextInput
            id="pdfURL"
            name="pdfURL"
            type="text"
            placeholder="Book pdf URL"
            required
            defaultValue={pdfURL}
          />
        </div>
        <Button type="submit" className="mt-5">
          Update the Book
        </Button>
      </form>
    </div>
  );
}

export default EditBooks;
