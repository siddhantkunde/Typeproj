import express ,{Application,Request,Response}from 'express';
import { Customer } from './models/customers';
const setupDb=require('./db/db-setup');
const app:Application = express();
const port:number=3000;



setupDb()
app.get('/',(req:Request,res:Response)=>{
    res.send('Hello world');
})

app.get('/users/:id', async (req:Request,res:Response, next) => {
    try {
        const { id } = req.params;
        const user = await Customer.query().findById(id);
        res.json(user);
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

app.post('/login',async(req:Request,res:Response)=>{
    try{      
       const users = await Customer.query().insert({
          name: "Akshay",
          email:"Aks@gmail.com",
          phone:"9988824258",
          password:"ak$1"
        });
       res.json(users);
  
    }
    catch(err) {
       console.error(err);
       return res.json({success: false, message: 'An error occurred, please try again later.'});
    };
  });

app.listen(port, ()=>{
    console.log('connect successfully on port 3000')
})