"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setupDb = require('./db/db-setup');
const app = (0, express_1.default)();
const port = 8080;
const login_route = require("./routes/login_route");
const postRoute = require("./routes/post");
const deletecustomer_route = require("./routes/deletecustomer_route");
const updatecustomer_route = require("./routes/updatecustomer_route");
// const createorder_route    = require("./routes/create_order");
const ProductRouter = require("./routes/ProductRouter");
setupDb();
// app.get('/',(req:Request,res:Response)=>{
//     res.send('Hello world');
// })
app.use(login_route);
app.use(postRoute);
app.use(deletecustomer_route);
app.use(updatecustomer_route);
// app.use(createorder_route);
app.use(ProductRouter);
app.listen(port, () => {
    console.log('connect successfully on port 8080');
});
