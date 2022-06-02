import Products from '../models/products';
const router = require('express').Router();
const verify=require('./verify_route')
import express ,{Application,NextFunction,Request,Response}from 'express';
import { error } from 'console';

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
router.post('/product',async(req:Request,res:Response,next:NextFunction) => {
    const User_id = Number(req.body.Uid)
    const Pname = String(req.body.name)
    const Pcategory = String(req.body.category)
    const Pprice = Number(req.body.price)
  
    const newproduct = new Products ({ User_id,Pname,Pcategory,Pprice })
  
    const upload = await Products.query().insert({
      Uid: User_id,
      name: Pname,
      category: Pcategory,
      price:Pprice,

    })
    res.send({message: "Item Uploaded!"})
  });

//     // validate request
//     if(!req.body.Uid ||!req.body.name || !req.body.category || !req.body.price) {
//         return res.status(400).send({
//             success: false,
//             message: "Please enter product name and price"
//         });
//     }

//     // create a product
//     const newproduct = new Products(
//         {
//             Uid:req.body.Uid,
//             name: req.body.name,
//             price: req.body.price
//         }
//     );

//     // save product in the database.
//     Products.save()
//         .then((data: any) => {
//             res.send({
//                 success: true,
//                 message: 'Product successfully created',
//                 data: data
//             });
//         }).catch((err: { message: any; }) => {
//         res.status(500).send({
//             success: false,
//             message: err.message || "Some error occurred while creating the product."
//         });
//     });
// });

// router.post('/items',verify, async(req:Request,res:Response,next:NextFunction) => {
//     console.log(req.body.Uid,req.body.price)
//     try {
//         const newproduct = await Products.query().insert({
//             Uid:req.body.Uid,
//             name:req.body.name,
//             category:req.body.category,
//             price:parseInt(req.body.price),
//         })
//         res.status(201).send('item added')
//     } catch (error) {
//         console.log({error})
//         res.status(400).send({message: "error"})
//     }
// })

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



