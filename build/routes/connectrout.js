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
const db = require('../db/db-setup');
const router = require('express').Router();
router.get('/:id/product', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // const myUser = await Product.query().eager('user').findById(id)
        const product = yield products_1.default.query().findById(id);
        const customer = yield product.$relatedQuery('user');
        res.status(201).json(customer);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "can't get product" });
    }
}));
module.exports = router;
