import mongoose from 'mongoose';

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

export default mongoose.model("ServiceItem", serviceItemSchema);