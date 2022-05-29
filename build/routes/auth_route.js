"use strict";
// import Customer from "../models/customers";
// import express ,{Request,Response,NextFunction}from 'express';
// const router = require('express').Router();
// const bodyParser = require("body-parser");
// const { json } = require('express/lib/response');
// // const database = require("./db/db.js");
// const setupDb=require('./db/db-setup');
// const cors = require("cors");
// const jwt = require("jsonwebtoken")
// const SECRET = "node1234"
// const bcrypt = require ("bcrypt")
// var corsOptions = {
//     origin: "http://localhost:8081"
//   };
//   router.use(cors());
//   // parse requests of content-type - application/json
//   router.use(bodyParser.json());
//   // parse requests of content-type - application/x-www-form-urlencoded
//   router.use(bodyParser.urlencoded({ extended: true }));
// // save user data via request
// router.post("/users/pt", (req:Request,res:Response,next:NextFunction) => {
//     bcrypt.hash(req.body.password, 10)
//     .then((hashedPassword: any) => {
//        return setupDb("users").insert({
//           name: req.body.name,
//           password: hashedPassword
//        })
//        .returning(["id", "name"])
//        .then((users: any[]) => {
//           res.json(users[0])
//        })
//        .catch((error: any) => next(error))
//     })
//  })
// // get the user data as a response
// router.get("/users", (req:Request,res:Response,next:NextFunction) => {
//    setupDb("users")
//     .then((users: any) => {
//        res.json(users)
//     })
//  })
// // login with user data in database
// router.post("/login", async(req:Request,res:Response,next:NextFunction) => {
//    setupDb("users")
//     .where({name: req.body.name})
//     .first()
//     .then((users: { password: any; }) => {
//        if(!users){
//           res.status(401).json({
//              error: "No user by that name"
//           })
//        }else{
//           return bcrypt
//           .compare(req.body.password, users.password)
//           .then((isAuthenticated: any) => {
//              if(!isAuthenticated){
//                 res.status(401).json({
//                    error: "Unauthorized Access!"
//                 })
//              }else{
//                 return jwt.sign(users, SECRET, (error: any, token: any) => {
//                    res.status(200).json({token})
//                 })
//              }
//           })
//        }
//     })
//  })
//  //verify 
//  router.get("/verify", (req:Request,res:Response) => {
//     const token = req.header.authorization.split(" ")[2]
//     //console.log(req.headers.authorization.split(" "))
//     jwt.verify(token, SECRET, (error: any, decodedToken: { id: any; name: any; }) => {
//        if(error){
//           res.status(401).json({
//              message: "Unauthorized Access!"
//           })
//        }else{
//           res.status(200).json({
//              id: decodedToken.id,
//              name: decodedToken.name
//           })
//        }
//     })
//  })
// module.exports = router;
