import Orders from "../../models/orders";
import Product from '../../models/products';
const router = require('express').Router();
import express ,{Application,NextFunction,Request,Response}from 'express';

//get the orders
router.get("/order", async (req:Request,res:Response,next:NextFunction) => {
   // const owner = req.userid;
   try {
       const order = await Orders.findOne({});
   if (order && order.products.length > 0) {
        res.status(200).send(order);
   } else {
         res.send(null);
   }
   } catch (error) {
       res.status(500).send();
   }
   });
//add to cart
router.post('/order',async (req:Request,res:Response,next:NextFunction) => {
   
   try {

       // Get product input 
      const { user_id,name,category,price} = req.body;

      const product = await Orders.query().insert({
         user_id,
         name,
         category,
         price
       });
       res.status(200).json(product);
   }catch (err) {
       console.log(err);
   }  
})
 module.exports=router