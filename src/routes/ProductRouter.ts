import Products from '../models/products';
const router = require('express').Router();
const verify=require('./verify_route')
import express ,{Application,NextFunction,Request,Response}from 'express';

//fetch all items
router.get('/product', async(req:Request,res:Response,next:NextFunction) => {
    try {
        const items = await Products.find({})
        res.status(200).send(items)
    } catch (error) {
        res.status(400).send(error)
    }
})

//fetch an item
router.post("/create/product", (req:Request,res:Response,next:NextFunction) => {
    return Products.query().insert({
     Uid: req.body.Uid,
     name:req.body.name,
     category:String(req.body.category),
     price:req.body.price
   })
   .returning(["id", "Uid", "name", "category","price"])
   .then((products: any[]) => {
      res.json(products[0])
   })
   .catch((error: any) => res.status(400).send(error))
})
// router.get('/product/:id', async(req:Request,res:Response,next:NextFunction) => {
//     try{
//         const item = await Products.findOne({_id: req.params.id})
//         if(!item) {
//             res.status(404).send({error: "Item not found"})
//         }
//         res.status(200).send(item) 
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

//create an item
router.post('/items',verify, async(req:Request,res:Response,next:NextFunction) => {
    console.log(req.body.Uid,req.body.price)
    try {
        const newproduct = await Products.query().insert({
            Uid:req.body.Uid,
            name:req.body.name,
            category:req.body.category,
            price:parseInt(req.body.price),
        })
        res.status(201).send('item added')
    } catch (error) {
        console.log({error})
        res.status(400).send({message: "error"})
    }
})

//update an item
router.put('/product/:id', verify, async(req:Request,res:Response,next:NextFunction) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','category', 'price']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates'})
    }

    try {
        const item = await Products.findOne({ _id: req.params.id})
    
        if(!item){
            return res.status(404).send()
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        res.send(item)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete item
router.delete('/product/:id', verify, async(req:Request,res:Response,next:NextFunction) => {
    try {
        const deletedItem = await Products.findOneAndDelete( {_id: req.params.id} )
        if(!deletedItem) {
            res.status(404).send({error: "Product not found"})
        }
        res.send(deletedItem)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router