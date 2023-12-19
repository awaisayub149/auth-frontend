// axios-config.js
import axios from 'axios';


console.log(process.env.BASE_URL, "THis is the base usrl")
const instance = axios.create({
  baseURL: process.env.BASE_URL,
  // Other Axios configurations...
});

export default instance;
