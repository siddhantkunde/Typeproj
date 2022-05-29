import Customer from "../models/customers";
import express ,{Application,NextFunction,Request,Response}from 'express';
const router = require('express').Router();
const bcrypt =require('bcrypt')
router.use(express.json())
const setupDb=require('../db/db-setup');
const jwt = require("jsonwebtoken")
const SECRET = "node1234"



// // save user data via request
router.post("/register", (req:Request,res:Response,next:NextFunction) => {
    bcrypt.hash(req.body.password, 10)
    .then((hashedPassword: any) => {
        return Customer.query().insert({
          name:String(req.body.name),
          email:req.body.email,
          phone:Number(req.body.phone),
          password: hashedPassword
       })
       .returning(["id", "name","email","phone","password"])
       .then((users: any[]) => {
          res.json(users[0])
       })
       .catch((error: any) => next(error))
    })
 })

 


//login customer
router.post('/login',async (req:Request,res:Response,next:NextFunction) => {
    //checking if the email exists
    const user= await Customer.query().findOne({email:req.body.email});
    if(!user)return res.status(400).send("email is not found");
    //checking for password
    const ValidPass = await bcrypt.compare(req.body.password,user.password);
    if(!ValidPass)return res.status(400).send('Invalid password');
    //create and assign a token
    const token=jwt.sign({_id:user._id},SECRET);
    // res.header('auth-token',token).send(token);
    res.status(200).send(token);

  })






module.exports = router;