import axiosInstance from "@/shared/api/axios-instance"
import { useShallow } from "zustand/react/shallow"
import { useToasts } from "./use-toast"
import { Role } from "../types"
import { useAuthStore } from "../store/auth-store"

export const useAuth = () => {
  const { handleError, handleWarning, handlePromise, handleSuccess } =
    useToasts()
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

  const login = async (email: string, password: string) => {
    setLoading(true)

    handlePromise(
      axiosInstance.post("/auth/login", {
        email,
        password,
      }),

      (response: any) => {
        setToken(response.data.token)
        setIsAuth(true)
        setLoading(false)
        if (response.data.message === "User logged in successfully.") {
          handleSuccess("Вы вошли в аккаунт.")
        }
      },

      (err: any) => {
        if (err.response.data.message === "User not found.") {
          handleWarning("Пользователь не найден.")
        }
        setLoading(false)
      },
    )
  }

  const register = async (
    phone: string | null,
    name: string,
    email: string,
    password: string,
    role: Role,
  ) => {
    handlePromise(
      axiosInstance.post("/auth/register", {
        phone,
        name,
        email,
        password,
        role,
      }),

      (response: any) => {
        if (response.data.message === "User registered successfully.") {
          handleSuccess(
            "Новый пользователь успешно зарегистрирован. Не забудьте отправить данные новому сотруднику.",
          )
        }
      },

      (err: any) => {
        if (err.response.data.message === "User already exists.") {
          handleWarning("Данный пользователь уже зарегистрирован.")
        }
      },
    )
  }

  const logout = async () => {
    handlePromise(
      axiosInstance.post("/auth/logout"),

      () => {
        setToken(null)
        setIsAuth(false)
      },

      (err) => {
        console.error(err)
      },
    )
  }

  return { isAuth, isLoading, register, login, logout, getCurrentUser }
}
