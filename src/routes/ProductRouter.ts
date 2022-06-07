import Product from '../models/products';
const router = require('express').Router();
const verify=require('./verify_route')
import express ,{Application,NextFunction,Request,Response}from 'express';





// fetch an item
router.get('/product/:id',verify,async (req:Request,res:Response) => {
    try {
        const { id } = req.params;
        const item = await Product.query().findById(id);
        res.json(item);
    } catch (error) {
        console.error(error)
        res.status(500).json(error).send('access Denied');
    }
})

//create an item
router.post('/product',async (req:Request,res:Response,next:NextFunction) => {
   
    try {
 
        // Get product input 
       const { user_id,name,category,price} = req.body;
 
       const product = await Product.query().insert({
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


//update an item
router.put('/product/:id', verify, async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const{ id }=req.params;
      const item = await Product.query().where({ id })
      .update({
       name : req.body.name,
       price: req.body.price,
       updated_at: new Date(),
      });
      res.json(item);
    }catch(err){
       console.error(err);
       res.status(500).json(err).send('Invalid name and price');
    }
 });

//delete item
router.delete('/product/:id',async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const{ id }=req.params;
      const prod = await Product.query().deleteById(id);
      res.json(prod);
 
    }catch(err){
       console.error(err);
       res.status(500).json(err).send('product is not deleted');;
    }
 
 });
module.exports=router;