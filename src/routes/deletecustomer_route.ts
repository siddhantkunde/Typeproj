import Customer from "../models/customers";
import express ,{Application,NextFunction,Request,Response}from 'express';
const router = require('express').Router();
const verify=require('./verify_route')


//Deleting data using id
router.delete('/users/:id', verify,async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const{ id }=req.params;
      const users = await Customer.query().deleteById(id);
      res.json(users);
 
    }catch(err){
       console.error(err);
       res.status(500).json(err).send('User is not deleted');;
    }
 
 });
module.exports=router;