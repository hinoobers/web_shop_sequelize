const Product = require("../../models/product");

class adminController {

    async addProduct(req, res) {
        try {
            const product = await Product.create({
                title: req.body.title,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                description: req.body.description
            })
            res.status(201).json({
                message: "Product is added successfully",
                productId: product.id
            })
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            product.title = req.body.title;
            product.price = req.body.price;
            product.imageUrl = req.body.imageUrl;
            product.description = req.body.description;
            await product.save();
            res.status(200).json({ message: "Product is updated successfully" });
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

    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            await product.destroy();
            res.status(200).json({ message: "Product is deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}

module.exports = new adminController();