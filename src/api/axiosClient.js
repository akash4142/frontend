import axios from "axios";

// ✅ Log API Base URL for debugging
console.log("🔍 Backend URL:", import.meta.env.VITE_BACKEND_URL);

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; 

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
