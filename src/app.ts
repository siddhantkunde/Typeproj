import express ,{Application,Request,Response}from 'express';
import User  from './models/customers';
const setupDb=require('./db/db-setup');
const app:Application = express();
const port:number=8080  
const login_route          = require("./routes/login_route")
const postRoute            = require("./routes/post");
const deletecustomer_route = require("./routes/deletecustomer_route");
const updatecustomer_route = require("./routes/updatecustomer_route");
const order_route =require("./routes/orders/create_order");
const ProductRouter = require("./routes/ProductRouter");
const connectrout =require("./routes/connectrout");
const cartRoute=require("./routes/cart/cart_route");

setupDb()
// app.get('/', (req:Request,res:Response) =>{
//     res.send('Hello world');
// })

app.use(login_route);
app.use(postRoute);
app.use(deletecustomer_route);
app.use(updatecustomer_route);
app.use(order_route);
app.use(ProductRouter);
app.use(connectrout);
app.use(cartRoute);


// app.use(createorder_route);


app.listen(port, ()=>{
    console.log('connect successfully on port 8080')
})