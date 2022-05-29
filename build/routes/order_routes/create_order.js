"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = __importDefault(require("../models/orders"));
const router = require('express').Router();
// // save order data via request
router.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
        return orders_1.default.query().insert({
            name: String(req.body.name),
            email: req.body.email,
            phone: Number(req.body.phone),
            password: hashedPassword
        })
            .returning(["id", "name", "email", "phone", "password"])
            .then((users) => {
            res.json(users[0]);
        })
            .catch((error) => next(error));
    });
});
module.exports = router;
