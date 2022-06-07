import User from "../models/customers";
import Product from '../models/products';

const db = require ('../db/db-setup')
import express ,{Application,NextFunction,Request,Response}from 'express';
const router = require('express').Router();
declare module "express" { 
    export interface Request {
      user: any
    }
  }



router.get('/:id/product', async (req:Request,res:Response,next:NextFunction) => {
  try {
      const { id } = req.params;
      // const myUser = await Product.query().eager('user').findById(id)
      const product= await Product.query().findById(id);
      const customer = await product.$relatedQuery('user')
      res.status(201).json(customer)
  } catch (err) {
    console.log(err);         
    res.status(500).json({message: "can't get product"})
  }
});

module.exports=router;  


