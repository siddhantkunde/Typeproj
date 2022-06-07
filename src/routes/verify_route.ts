
import User from "../models/customers";
import express ,{Application,NextFunction,Request,Response}from 'express';
const router = require('express').Router();
const jwt = require("jsonwebtoken")
const SECRET = "node1234"
declare module "express" { 
    export interface Request {
      user: any
    }
  }

module.exports=function (req:Request,res:Response,next:NextFunction){
    const token =req.header('auth-token');
    
    if(!token)return res.status(401).send('access Denied');

    try{
        const verified = jwt.verify (token,SECRET);
        req.user=verified;
        
        next();

    }catch(error){
        res.status(400).send('invalid token')
    }

    
}