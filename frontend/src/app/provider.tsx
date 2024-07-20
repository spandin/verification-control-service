import "react-toastify/dist/ReactToastify.css"

import { NextUIProvider } from "@nextui-org/system"
import { useNavigate } from "react-router-dom"
import { RootLayout } from "./layouts/root-layout"
import { ToastContainer } from "react-toastify"

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <RootLayout>{children}</RootLayout>
      <ToastContainer />
    </NextUIProvider>
  )
}
