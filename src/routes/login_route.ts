import Customer from "../models/customers";
import express ,{Application,NextFunction,Request,Response}from 'express';
const router = require('express').Router();
const bcrypt =require('bcrypt')
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
router.use(express.json())
const setupDb=require('../db/db-setup');
const jwt = require("jsonwebtoken")
const SECRET = "node1234"
declare module "express" { 
   export interface Request {
     user: any,
     
   }
 }


// // save user data via request
// router.post("/register", (req:Request,res:Response,next:NextFunction) => {
//     bcrypt.hash(req.body.password, 10)
//     .then((hashedPassword: any) => {
//         return Customer.query().insert({
//           name:String(req.body.name),
//           email:req.body.email,
//           phone:Number(req.body.phone),
//           password: hashedPassword
          
//        })
//        .returning(["id", "name","email","phone","password"])
//        .then((users: any[]) => {
//           res.json(users[0])
//        })
//        .catch((error: any) => next(error))
//     })
//  })

router.post("/register",async (req:Request,res:Response,next:NextFunction) =>{



   try {

   // Get user input

      const { name,email,phone,password } = req.body;

      
          // Validate user input
      if (!(email && password && name && phone)) {
      res.status(400).send("All input is required");
      }
      //validate phone number
      var val = phone
      if (/^\d{10}$/.test(val)) {
     }else {
      res.status(400).send("Invalid number; must be ten digits")
      return false
      }

      
    // check if user already exist
    // Validate if user exist in our database
      const oldUser = await Customer.query().findOne({ email });

      if (oldUser) {
         return res.status(409).send("User Already Exist. Please Login");
      }
      //Encrypt user password
      
      const hashedPassword = await bcrypt.hash(password, 10);


      const user = await Customer.query().insert({

         name,
         phone,
         email: email.toLowerCase(), // sanitize: convert email to lowercase
         password: hashedPassword,
      });
      // Create token
      const token = jwt.sign(

         { user_id: user._id, email },
         SECRET,
         { 
            expiresIn: "2h",
         }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json(user);
   }  catch (err) {
      console.log(err);
   }

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



