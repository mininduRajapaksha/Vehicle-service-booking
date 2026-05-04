import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required:true
  },
    description: {
    type: String,
    required:true
  },
    price: {
    type: Number,
  },
    duration:{
    type: String,
    },
    createdAt: {
    type: Date,
    default: Date.now
  },
    Image:{
    type: String,
    }
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;