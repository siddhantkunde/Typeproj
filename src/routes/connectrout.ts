import Customer from "../models/customers";
import Product from '../models/products';
const db = require ('../db/db-setup')
import express ,{Application,NextFunction,Request,Response}from 'express';
const router = require('express').Router();
declare module "express" { 
    export interface Request {
      user: any
    }
  }


// Get specific product details  and user name from user table  by id as parameter.
// router.get('/products/:id', async (req:Request,res:Response,next:NextFunction) => {
//     
//     console.log(id);
//     // console.log(setupDb('products'));
    
    
//     try {
//         const product = await Product.query().joinRelated('products')
//         .where({user_id:id});
  
//         res.status(200).json(product)
//     } catch (err) {
//         console.log(err);
        
//       res.status(500).json({message: "can't get product"})
//     }
//   })
router.get('/:id', async (req:Request,res:Response,next:NextFunction) => {
    try {
        const { id } = req.params;
        const product = await Product.query().findById(id);
        res.status(200).json(product)
    } catch (err) {
                console.log(err);
                
              res.status(500).json({message: "can't get product"})
        }
});

module.exports=router;  

function id(id: any) {
    throw new Error("Function not implemented.");
}
