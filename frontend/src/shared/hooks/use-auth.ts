import axiosInstance from "@/shared/api/axios-instance"
import { useShallow } from "zustand/react/shallow"
import { useToasts } from "./use-toast"
import { Role } from "../types"
import { useAuthStore } from "../store/auth-store"

export const useAuth = () => {
  const { handleError, handleWarning, handlePromise } = useToasts()
  const { isAuth, isLoading, setIsAuth, setLoading, setToken } = useAuthStore(
    useShallow((state) => ({
      isAuth: state.isAuth,
      isLoading: state.isLoading,
      setIsAuth: state.setIsAuth,
      setLoading: state.setLoading,
      setToken: state.setToken,
    })),
  )

  const getCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/users/me")

      return response.data
    } catch (error) {
      handleError(error)
    }
  }

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Role,
  ) => {
    setLoading(true)

    handlePromise(
      axiosInstance.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        role,
      }),
      {
        st: "Добро пожаловать",
        sd: "Регистрация прошла успешно.",
      },

      (response: any) => {
        setToken(response.data.token)
        setLoading(false)
      },

      (err: any) => {
        if (err.response.data.message === "User already exists.") {
          handleWarning("Извините", "Данный пользователь уже зарегистрирован.")
        }
        setLoading(false)
      },
    )
  }

  const login = async (email: string, password: string) => {
    setLoading(true)

    handlePromise(
      axiosInstance.post("/auth/login", {
        email,
        password,
      }),
      {
        st: "Добро пожаловать",
        sd: "Авторизация прошла успешно.",
      },

      (response: any) => {
        setToken(response.data.token)
        setIsAuth(true)
        setLoading(false)
      },

      (err: any) => {
        if (err.response.data.message === "User not found.") {
          handleWarning(
            "Извините",
            "Похоже данного пользователя не существует.",
          )
        }
        setLoading(false)
      },
    )
  }

  const logout = async () => {
    handlePromise(
      axiosInstance.post("/auth/logout"),
      {
        st: "Прощайте",
        sd: "Вы вышли из аккаунта.",
      },

      () => {
        setToken(null)
      },

      (err) => {
        console.error(err)
      },
    )
  }

  return { isAuth, isLoading, register, login, logout, getCurrentUser }
}
