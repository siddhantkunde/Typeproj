import Orders from "../models/orders";
const router = require('express').Router();
import express ,{Application,NextFunction,Request,Response}from 'express';


// // save order data via request
router.post("/create/order", (req:Request,res:Response,next:NextFunction) => {
        return Orders.query().insert({
         user_id: req.body.user_id,
         order_name:String(req.body.order_name),
         status:String(req.body.status)
       })
       .returning(["id", "user_id", "order_name", "status"])
       .then((orders: any[]) => {
          res.json(orders[0])
       })
       .catch((error: any) => next(error))
    })
 module.exports=router;