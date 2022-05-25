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
const express_1 = __importDefault(require("express"));
const customers_1 = require("./models/customers");
const setupDb = require('./db/db-setup');
const app = (0, express_1.default)();
const port = 3000;
setupDb();
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.get('/users/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield customers_1.Customer.query().findById(id);
        res.json({ data: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield customers_1.Customer.query().insert({
            name: "Akshay",
            email: "Aks@gmail.com",
            phone: "9988824258",
            password: "ak$1"
        });
        res.json(users);
    }
    catch (err) {
        console.error(err);
        return res.json({ success: false, message: 'An error occurred, please try again later.' });
    }
    ;
}));
app.listen(port, () => {
    console.log('connect successfully on port 3000');
});
