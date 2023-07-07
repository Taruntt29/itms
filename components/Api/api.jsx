import axios from "axios";
import { API_KEY, decryptData } from "../../utils/SECURE";
const axiosInstance = axios.create({
  //  baseURL: `http://192.168.100.60:8040/manitou-tms`,
  // baseURL: `http://192.168.50.53:8004/manitou-tms`,
  baseURL: `http://180.151.3.104:8040/manitou-tms`,
  headers: {
    //"Content-Type": "application/json",
    "Content-Type": "application/json,multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    // Allow requests from any origin (replace '*' with the specific origin if needed)
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Specify the allowed HTTP methods
    "Access-Control-Allow-Headers": "Content-Type, Authorization", // Specify the allowed headers
    Authorization: sessionStorage.getItem("token")
      ? decryptData(sessionStorage.getItem("token"), API_KEY)
      : "",
    // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.Authorization = token;
  } else {
    delete axiosInstance.defaults.headers.Authorization;
  }
};
export { axiosInstance, setAuthToken };
