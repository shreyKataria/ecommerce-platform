const Order = require("../models/Order");
const Product = require("../models/Product");

exports.placeOrder = async (req, res) => {
  const { userId, products, paymentMethod } = req.body;

  try {
    const total = products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const order = new Order({ user: userId, products, total, paymentMethod });
    await order.save();

    for (const items of order) {
      const product = await Product.findById(items.product);

      if (product) {
        product.stock -= items.qty;
        await product.save();
      } else {
        res.status(404);
        throw new Error(`Product not found: ${item.product}`);
      }
    }

    res.status(201).send("Order placed");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
