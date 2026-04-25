import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.3:5000/",
//   baseURL: "http://localhost:5000/",
});

export default API;