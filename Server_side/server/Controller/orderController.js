const { createOrder, captureOrder } = require("../Services/paypalService");
const catchAsync = require("../utils/catchAsync");

exports.createOrderController = catchAsync(async (req, res, next) => {
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
});

exports.captureOrderController = catchAsync(async (req, res, next) => {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
});