import axios from "axios";

const API = axios.create({
  // baseURL: "https://vehicle-service-booking-dpzu.onrender.com",
  baseURL:"http://192.168.1.3:5000/",
  // baseURL: "http://localhost:5000/",
// baseURL: "https://192.168.1.3:8081",
});

export default API;