const mongoose = require('mongoose');

const serviceItemSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    category:{
        type: String,
    }
});

module.exports = mongoose.model("ServiceItem", serviceItemSchema);