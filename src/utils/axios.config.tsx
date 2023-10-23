import axios from "axios";
import Cookies from "js-cookie";
const baseURL = "http://210.245.108.202:3013/api/vltg";
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
  let accessToken = Cookies.get("token_base365");
  return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
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
  let accessToken = Cookies.get("token_base365");
  return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
});

export const deleteToken = () => {
  Cookies.remove("token_base365");
};
export const checkToken = () => {
  const check = Cookies.get("token_base365");
  if (check) {
    return true;
  }
  return false;
};
