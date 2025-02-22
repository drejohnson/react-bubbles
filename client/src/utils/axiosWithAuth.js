import axios from "axios";

const axiosWithAuth = () => {
  let token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });
};

export default axiosWithAuth;
