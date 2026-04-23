const router = require('express').Router();
import ServiceItem from '../models/serviceItem.js';

// Create a new item
 router.route("/add").post(req,res =>{
    const {name, description, price, category} = req.body;

    const newServiceItem = new ServiceItem({
        name,
        description,
        price,
        category
    })
    newServiceItem.save()
    .then((req,res)=>{res.json("Item Saved")})
    .catch(err=> res.status(400).json("Error:" +err));
 });
