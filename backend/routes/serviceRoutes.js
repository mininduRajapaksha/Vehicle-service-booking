import express from "express";
const router = express.Router();
import Service from "../models/service.js";
import upload from "../middleware/upload.js";

// Create a new service
router.route("/add").post(upload.single("image"), (req, res) => {
    const { serviceName, description, price, duration } = req.body;

    const newService = new Service({
        serviceName,
        description,
        price,
        duration,
        Image: req.file ? req.file.path : null,
    });
    newService.save().then(()=>{
        res.json("Service Added")
    }).catch(err => res.status(400).json("Error: " + err));
});

//Get all services
router.route("/").get((req,res) =>{
    Service.find()
    .then(services => res.json(services))
    .catch(err => res.status(400).json("Error: " + err));
});

//get one service

router.route("/:id").get((req,res) =>{
    Service.findById(req.params.id)
    .then(service => res.json(service))
    .catch(err => res.status(400).json("Error: " + err));
})

//update a service
router.route("/update/:id").put((req,res) =>{
    Service.findById(req.params.id)
    .then(Service =>{
        Service.serviceName = req.body.serviceName;
        Service.description = req.body.description;
        Service.price = req.body.price;
        Service.duration = req.body.duration;

        Service.save()
        .then(()=>{res.json("Service Updated")
        }).catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//delete a service
router.route("/delete/:id").delete((req,res) =>{
    Service.findByIdAndDelete(req.params.id)
    .then(() => res.json("Service Deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

export default router;