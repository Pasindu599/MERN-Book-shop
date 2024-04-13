const mongoose = require("mongoose");

const schema = mongoose.Schema;

const bookSchema = new schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  bookImage: { type: String, required: true },
  authorName: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  pdfURL: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
