const Product = require("../models/product");

class productController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new productController();