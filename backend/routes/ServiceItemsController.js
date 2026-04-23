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

 //update item
 router.route("update/:id").put((req,res) =>{
    ServiceItem.findByIdAndUpdate(req.params.id, req.body)
    .then((req,res) =>{res.json("Item Updated")})
    .catch(err => res.status(400).json("Error: " + err));

 })

 //get one item
 router.route("get/:id").get((req,res) =>{
    ServiceItem.findById(req.params.id)
    .then(ServiceItem => res.json(ServiceItem))
    .catch(err=> res.status(400).json("Error:"+ err));
 });
