import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      customer,
      items,
      subtotal,
      delivery,
      totalAmount,
      paymentMethod,
    } = req.body;

    // Required details
    if (
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !customer?.address ||
      !customer?.city ||
      !customer?.state ||
      !customer?.pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "All delivery details are required.",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one product.",
      });
    }

    // Valid MongoDB user ID ho to save karo
    const validUserId =
      userId && mongoose.Types.ObjectId.isValid(userId)
        ? userId
        : null;

    const order = await Order.create({
      orderId:
        "AV" +
        Date.now().toString().slice(-8),

      userId: validUserId,

      customer,

      items: items.map((item) => ({
        productId: String(item.productId),
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image || "",
      })),

      subtotal: Number(subtotal),
      delivery: Number(delivery || 0),
      totalAmount: Number(totalAmount),

      paymentMethod:
        paymentMethod || "Cash on Delivery",

      paymentStatus: "Pending",
      orderStatus: "Order Placed",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to place order.",
      error: error.message,
    });
  }
});

export default router;