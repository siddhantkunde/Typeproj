"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const jwt = require("jsonwebtoken");
const SECRET = "node1234";
module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).send('access Denied');
    try {
        const verified = jwt.verify(token, SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).send('invalid token');
    }
};
