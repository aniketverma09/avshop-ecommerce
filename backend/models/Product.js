import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Fashion",
        "Shoes",
        "Accessories",
      ],
    },

    price: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "Premium quality product",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;