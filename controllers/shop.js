const Product = require("../models/product");
const Cart = require("../models/cart");

class shopController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getCart(req, res) {
        try {
            console.log(req);
            const cart = await req.user.getCart();
            const products = await cart.getProducts() ;
            res.status(200).json(products);
        } catch (err) {
            res.status(200).json({products: []});
        }
    }

    async addToCart(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            const cart = await req.user.getCart();
            await cart.addProduct(product);
            res.status(200).json({ message: "Product added to cart" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async removeFromCart(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            const cart = await req.user.getCart();
            await cart.removeProduct(product);
            res.status(200).json({ message: "Product removed from cart" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new shopController();