const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Forbidden");

  const { name, description, price, stock } = req.body;

  try {
    const product = new Product({ name, description, price, stock });
    await product.save();
    res.status(201).send("Product created");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateProduct = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Forbidden");

  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  try {
    await Product.findByIdAndUpdate(id, { name, description, price, stock });
    res.send("Product updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteProduct = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Forbidden");

  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.send("Product deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
