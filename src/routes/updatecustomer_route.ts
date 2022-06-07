import User from "../models/customers";
import express ,{Application,NextFunction,Request,Response}from 'express';
const router = require('express').Router();
const verify=require('./verify_route')


// Update name  using id
router.put('/users/:id', verify, async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const{ id }=req.params;
      const users = await User.query().where({ id })
      .update({
       name : req.body.name,
       updated_at: new Date(),
      });
      res.json(users);
    }catch(err){
       console.error(err);
       res.status(500).json(err).send('Invalid name');
    }
 });

module.exports=router;