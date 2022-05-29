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
const customers_1 = __importDefault(require("../models/customers"));
const express_1 = __importDefault(require("express"));
const router = require('express').Router();
const bcrypt = require('bcrypt');
router.use(express_1.default.json());
const setupDb = require('../db/db-setup');
const jwt = require("jsonwebtoken");
const SECRET = "node1234";
// // save user data via request
router.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
        return customers_1.default.query().insert({
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
//login customer
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if the email exists
    const user = yield customers_1.default.query().findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("email is not found");
    //checking for password
    const ValidPass = yield bcrypt.compare(req.body.password, user.password);
    if (!ValidPass)
        return res.status(400).send('Invalid password');
    //create and assign a token
    const token = jwt.sign({ _id: user._id }, SECRET);
    // res.header('auth-token',token).send(token);
    res.status(200).send(token);
}));
module.exports = router;
