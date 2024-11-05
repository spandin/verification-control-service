import axios from "axios"
import { useAuthStore } from "../store/auth-store"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
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
