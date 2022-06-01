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
//fetch all items
router.get('/product', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield products_1.default.find({});
        res.status(200).send(items);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
//fetch an item
router.get('/product/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield products_1.default.findOne({ _id: req.params.id });
        if (!item) {
            res.status(404).send({ error: "Item not found" });
        }
        res.status(200).send(item);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
//create an item
router.post('/items', verify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newproduct = yield products_1.default.query().insert({
            Uid: req.body.Uid,
            name: String(req.body.name),
            category: req.body.category,
            price: Number(req.body.phone),
        });
        res.status(201).send(newproduct);
    }
    catch (error) {
        console.log({ error });
        res.status(400).send({ message: "error" });
    }
}));
//update an item
router.put('/product/:id', verify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'category', 'price'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates' });
    }
    try {
        const item = yield products_1.default.findOne({ _id: req.params.id });
        if (!item) {
            return res.status(404).send();
        }
        updates.forEach((update) => item[update] = req.body[update]);
        yield item.save();
        res.send(item);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
//delete item
router.delete('/product/:id', verify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedItem = yield products_1.default.findOneAndDelete({ _id: req.params.id });
        if (!deletedItem) {
            res.status(404).send({ error: "Product not found" });
        }
        res.send(deletedItem);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
module.exports = router;
