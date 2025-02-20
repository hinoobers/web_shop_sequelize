const Order = require("../models/order");

class orderController {
    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll();
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getOrderById(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


    async completeOrder(req, res) {
        try {
            // create order with all cart items
            const order = await req.user.createOrder();

            // get cart items
            const cart = await req.user.getCart();
            const products = await cart.getProducts();

            // add products to order
            await order.addProducts(products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity };
                return product;
            }));

            // clear cart
            await cart.setProducts(null);

            res.status(200).json({ message: "Order completed successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new orderController();