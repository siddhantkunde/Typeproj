"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = __importDefault(require("../../models/cart"));
const router = require('express').Router();
const verify = require('../verify_route');
//get the orders
router.get('/cart/:id', verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield cart_1.default.query().findById(id);
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "cart ID not available" });
    }
}));
//add to cart
router.post('/cartt', verify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get product input 
        const { user_id, prod_id, status, quantity, bill } = req.body;
        const cart = yield cart_1.default.query().insert({
            user_id,
            prod_id,
            status,
            quantity,
            bill
        });
        res.status(200).json(cart);
    }
    catch (err) {
        console.log(err);
    }
}));
//Deleting data using id
router.delete('/cart/:id', verify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const users = yield cart_1.default.query().deleteById(id);
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err).send('cart is not deleted');
        ;
    }
}));
router.get('/:id/cart', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // const product = await Product.query().findById(id).withGraphFetched('owner')
        const cart = yield cart_1.default.query().findById(id);
        const customer = yield cart.$relatedQuery('prod');
        // console.log(customer);
        //$relatedQuery
        res.status(201).json(customer);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "order not available" });
    }
}));
//update an cart
router.put('/cart/:id', verify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cart = yield cart_1.default.query().where({ id })
            .update({
            quantity: req.body.quantity,
            bill: req.body.bill,
            updated_at: new Date(),
        });
        res.json(cart);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err).send('Invalid quantity');
    }
}));
module.exports = router;
