const express = require("express");
const { createOrderController, captureOrderController } = require("../Controller/orderController");
const authController = require("../Controller/authController");

const router = express.Router();

router.post("/", authController.protect, createOrderController);
router.post("/:orderID/capture",  captureOrderController);

module.exports = router;