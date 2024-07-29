const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).send("Product ID and quantity are required");
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      // Check if the product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Update the quantity if the product is already in the cart
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add the product to the cart
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).send("Product added to cart");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
