"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = __importDefault(require("../models/orders"));
const router = require('express').Router();
// // save order data via request
router.post("/create/order", (req, res, next) => {
    return orders_1.default.query().insert({
        user_id: req.body.user_id,
        order_name: String(req.body.order_name),
        status: String(req.body.status)
    })
        .returning(["id", "user_id", "order_name", "status"])
        .then((orders) => {
        res.json(orders[0]);
    })
        .catch((error) => next(error));
});
module.exports = router;
