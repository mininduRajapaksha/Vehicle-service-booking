import express from "express";
const router = express.Router();
import Service from "../models/service.js";
import upload from "../middleware/upload.js";

// Create a new service
router.route("/add").post((req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            console.error("Upload Error:", err.message);
            return res.status(400).json({ error: "Image upload failed: " + err.message });
        }
        next();
    });
}, (req, res) => {
    try {
        const { serviceName, description, price, duration } = req.body;
        console.log("Adding service:", { serviceName, hasImage: !!req.file, imagePath: req.file?.path });

        const newService = new Service({
            serviceName,
            description,
            price,
            duration,
            Image: req.file ? req.file.path : null,
        });
        newService.save().then(()=>{
            res.json("Service Added")
        }).catch(err => {
            console.error("Save Error:", err);
            res.status(400).json("Error: " + err);
        });
    } catch (err) {
        console.error("Route Error:", err);
        res.status(500).json({ error: "Failed to add service: " + err.message });
    }
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
router.route("/update/:id").put((req,res,next) =>{
    upload.single("image")(req, res, (err) => {
        if (err) {
            console.error("Upload Error:", err.message);
            return res.status(400).json({ error: "Image upload failed: " + err.message });
        }
        next();
    });
}, (req,res) =>{
    try {
        Service.findById(req.params.id)
        .then(service =>{
            service.serviceName = req.body.serviceName;
            service.description = req.body.description;
            service.price = req.body.price;
            service.duration = req.body.duration;

            if (req.file) {
                service.Image = req.file.path;
            }

            service.save()
            .then(()=>{res.json("Service Updated")
            }).catch(err => {
                console.error("Save Error:", err);
                res.status(400).json("Error: " + err);
            });
        })
        .catch(err => {
            console.error("Find Error:", err);
            res.status(400).json("Error: " + err);
        });
    } catch (err) {
        console.error("Route Error:", err);
        res.status(500).json({ error: "Failed to update service: " + err.message });
    }
});

//delete a service
router.route("/delete/:id").delete((req,res) =>{
    Service.findByIdAndDelete(req.params.id)
    .then(() => res.json("Service Deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

export default router;