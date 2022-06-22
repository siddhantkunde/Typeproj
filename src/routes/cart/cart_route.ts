import Cart from "../../models/cart";
import Product from '../../models/products';
import User from "../../models/customers";
const router = require('express').Router();
const verify=require('../verify_route')
import express ,{Application,NextFunction,Request,Response}from 'express';

//get the orders
router.get('/cart/:id',verify,async (req:Request,res:Response) => {
    try {
        const { id } = req.params;
        const user = await Cart.query().findById(id);
        res.json(user);
    }catch (err) {
        console.log(err);         
        res.status(500).json({message: "cart ID not available"})
    }
})
//add to cart
router.post('/cartt',verify,async (req:Request,res:Response,next:NextFunction) => {
   
    try{      
        // Get product input 

        const { user_id,prod_id,status,quantity,bill} = req.body;

        const cart = await Cart.query().insert({   
            user_id,
            prod_id,
            status,
            quantity,
            bill
            });
            
        res.status(200).json(cart);
   }catch (err) {
       console.log(err);
   }  
})

//Deleting data using id
router.delete('/cart/:id',verify,async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const{ id }=req.params;
      const users = await Cart.query().deleteById(id);
      res.json(users);
 
    }catch(err){
       console.error(err);
       res.status(500).json(err).send('cart is not deleted');;
    }
 
 });



router.get('/:id/cart', async (req:Request,res:Response,next:NextFunction) => {
    try {
        const { id } = req.params;
        // const product = await Product.query().findById(id).withGraphFetched('owner')
        const cart= await Cart.query().findById(id);
        const customer = await cart.$relatedQuery('prod')
        
        // console.log(customer);
        //$relatedQuery
        res.status(201).json(customer)
    } catch (err) {
      console.log(err);         
      res.status(500).json({message: "order not available"})
    }
  });

  //update an cart
router.put('/cart/:id',verify,async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const{ id }=req.params;
      const cart = await Cart.query().where({ id })
      .update({
       quantity : req.body.quantity,
       bill:req.body.bill,
       updated_at: new Date(),
      });
      res.json(cart);
    }catch(err){
       console.error(err);
       res.status(500).json(err).send('Invalid quantity');
    }
 });

module.exports=router