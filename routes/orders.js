const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.js");

router.get("/orders", (req, res) => orderController.getAllOrders(req, res));
router.get("/order/:id", (req, res) => orderController.getOrderById(req, res));
router.post("/completeorder/:id", (req, res) => orderController.completeOrder(req, res));
module.exports = router;