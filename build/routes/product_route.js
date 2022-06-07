"use strict";
// import Product from '../models/products';
// const router = require('express').Router();
// const verify=require('./verify_route')
// import express ,{Application,NextFunction,Request,Response}from 'express';
// router.post("/product", async (req:Request,res:Response,next:NextFunction) => {
//         console.log("product route");
//         try {
//             // Get product input
//             const { user_id,name,category,price} = req.body;
//             const product = await Product.query().insert({
//                 user_id,
//                 name,
//                 category,
//                 price
//             });
//             res.status(201).json(product);
//         }catch (err) {
//             console.log(err);
//         }  
//  })
// module.exports = router;       
//     return Product.query().insert({
//      user_id: req.body.user_id,
//      name:req.body.name,
//      category:String(req.body.category),
//      price:String(req.body.price)
//    })
//     .returning(["user_id", "name", "category","price"])
//     .then((products: any[]) => {
//       res.json(products[0])
//    })
//     .catch((error: any) => {
//         console.log(error)
//   })
