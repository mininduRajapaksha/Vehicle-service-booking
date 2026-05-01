import axios from "axios";

const API = axios.create({
  baseURL: "https://vehicle-service-booking-dpzu.onrender.com",
  // "http://192.168.1.3:5000/",
//   baseURL: "http://localhost:5000/",
});

export default API;