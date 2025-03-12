import axios from "axios";



const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; 
//const BASE_URL = "http://localhost:5000"; 

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
