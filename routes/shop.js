const express = require("express");
const router = express.Router()
const shopController = require("../controllers/shop");

router.get("/cart", (req, res) => shopController.getCart(req, res));
router.post("/addtocart/:id", (req, res) => shopController.addToCart(req, res));
router.post("/removefromcart/:id", (req, res) => shopController.removeFromCart(req, res));
module.exports = router;