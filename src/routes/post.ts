const router = require('express').Router();
import User from "../models/customers";
const verify=require('./verify_route')
import express ,{Application,NextFunction,Request,Response}from 'express';

router.get('/user/:id',verify,async (req:Request,res:Response) => {
    try {
        const { id } = req.params;
        const user = await User.query().findById(id);
        res.json(user);
    } catch (error) {
        console.error(error)
        res.status(500).json(error).send('access Denied');
    }
})

module.exports=router;