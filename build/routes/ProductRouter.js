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
const products_1 = __importDefault(require("../models/products"));
const router = require('express').Router();
const verify = require('./verify_route');
// fetch an item
router.get('/product/:id', verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const item = yield products_1.default.query().findById(id);
        res.json(item);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error).send('access Denied');
    }
}));
//create an item
router.post('/product', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get product input 
        const { user_id, name, category, price } = req.body;
        const product = yield products_1.default.query().insert({
            user_id,
            name,
            category,
            price
        });
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
    }
}));
//update an item
router.put('/product/:id', verify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const item = yield products_1.default.query().where({ id })
            .update({
            name: req.body.name,
            price: req.body.price,
            updated_at: new Date(),
        });
        res.json(item);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err).send('Invalid name and price');
    }
}));
//delete item
router.delete('/product/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const prod = yield products_1.default.query().deleteById(id);
        res.json(prod);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err).send('product is not deleted');
        ;
    }
}));
module.exports = router;
