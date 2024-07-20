import "react-toastify/dist/ReactToastify.css"

import { NextUIProvider } from "@nextui-org/system"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useNavigate } from "react-router-dom"
import { RootLayout } from "./layouts/root-layout"
import { ToastContainer } from "react-toastify"

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <RootLayout>{children}</RootLayout>
        <ToastContainer />
      </NextThemesProvider>
    </NextUIProvider>
  )
}
