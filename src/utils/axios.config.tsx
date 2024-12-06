import axios from "axios";
import Cookies from "js-cookie";
// const baseURL = "https://apivieclamtheogio.devopszero.id.vn/api/vltg";
const baseURL = "http://localhost:3011/api/vltg";
export const axiosTruocDN = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    // Authentication: accessToken,
  },
});

export const axiosSauDN = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    // Authentication: accessToken,
  },
});
axiosSauDN.interceptors.request.use((config: any) => {
  let token = Cookies.get("accessToken");
  // let token = localStorage.getItem("accessToken");
  return { ...config, headers: { Authorization: `Bearer ${token}` } };
});

export const axiosLocal = axios.create({
  url: "http://localhost:5000/api/vltg",
  headers: {
    "Content-Type": "application/json",
    // Authentication: accessToken,
  },
});
export const privateAxiosUpload = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    // Authentication: accessToken,
  },
});
privateAxiosUpload.interceptors.request.use((config: any) => {
  // let accessToken = localStorage.getItem("accessToken");
  let accessToken = Cookies.get("accessToken");
  return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
});

export const deleteToken = () => {
  Cookies.remove("accessToken");
  Cookies.remove("UT");
};
export const checkToken = () => {
  // let check = localStorage.getItem("accessToken");
  let check = Cookies.get("accessToken");
  if (check) {
    return true;
  }
  return false;
};
