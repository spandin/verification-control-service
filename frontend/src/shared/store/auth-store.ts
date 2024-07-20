import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface StoreState {
  token: string | null
  isAuth: boolean
  isLoading: boolean

  setToken: (token: string | null) => void
  setIsAuth: (isAuth: boolean) => void
  setLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        isAuth: false,
        isLoading: false,

        setToken: (token) => set({ token }),
        setIsAuth: (isAuth) => set({ isAuth }),
        setLoading: (isLoading) => set({ isLoading }),
      }),
      {
        name: "auth_store",
      },
    ),
  ),
)
