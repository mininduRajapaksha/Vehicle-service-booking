const router = require("express").Router();
import Service from "../models/service.js";

// Create a new service
router.route("/add").post(req,res =>{
    const {serviceName, description, price, duration} = req.body;

    const newService = new Service({
        serviceName,
        description,
        price,
        duration
    });
    newService.save().then(()=>{
        res.json("Service Added")
    }).catch(err => res.status(400).json("Error: " + err));
});

//Get all services
router.route("/").get(req,res =>{
    Service.find()
    .then(services => res.json(services))
    .catch(err => res.status(400).json("Error: " + err));
});