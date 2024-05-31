const mongoose = require("mongoose");

const schema = mongoose.Schema;

const bookSchema = new schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  productImage: { type: String, required: true },
  normalPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  category: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Book", bookSchema);
