import express from "express";
const router = express.Router();
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

//get one service

router.route("/get/:id").get(req,res =>{
    Service.findById(req.params.id)
    .then(service => res.json(service))
    .catch(err => res.status(400).json("Error: " + err));
})

//update a service
router.route("/update/:id").put(req,res =>{
    Service.findById(req.params.id)
    .then(service =>{
        service.serviceName = req.body.serviceName;
        service.description = req.body.description;
        service.price = req.body.price;
        service.duration = req.body.duration;

        service.save()
        .then(()=>{res.json("Service Updated")
        }).catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//delete a service
router.route("/delete/:id").delete(req,res =>{
    Service.findByIdAndDelete(req.params.id)
    .then(() => res.json("Service Deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;