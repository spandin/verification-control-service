import axios from "axios"
import { SITE_CONFIG } from "../config/site"

const axiosInstance = axios.create({
  baseURL: SITE_CONFIG.BASE_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
