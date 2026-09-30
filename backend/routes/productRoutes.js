import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/*
  GET ALL PRODUCTS

  /api/products
*/
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});


/*
  GET PRODUCTS BY CATEGORY

  /api/products?category=Electronics
  /api/products?category=Fashion
  /api/products?category=Shoes
  /api/products?category=Accessories
*/
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.find({
      category: {
        $regex: `^${category}$`,
        $options: "i",
      },
    });

    res.json({
      success: true,
      category,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch category products",
      error: error.message,
    });
  }
});


/*
  GET SINGLE PRODUCT

  /api/products/:id
*/
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});


/*
  ADD PRODUCT

  POST /api/products
*/
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
});


export default router;