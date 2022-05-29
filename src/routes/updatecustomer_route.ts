import Customer from "../models/customers";
import express ,{Application,NextFunction,Request,Response}from 'express';
const router = require('express').Router();
const verify=require('./verify_route')


// Update name  using id
router.patch('/users/:id', verify, async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const{ id }=req.params;
      const users = await Customer.query().where({ id })
      .update({
       name : req.body.name,
       updated_at: new Date(),
      });
      res.json(users);
    }catch(err){
       console.error(err);
       res.status(500).json(err);
    }
 });

module.exports=router;