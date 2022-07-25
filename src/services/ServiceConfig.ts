import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Api;
