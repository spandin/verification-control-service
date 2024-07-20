import axios from "axios"
import { SITE_CONFIG } from "../config/site"
import { useAuthStore } from "../store/auth-store"

const axiosInstance = axios.create({
  baseURL: SITE_CONFIG.BASE_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token

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
