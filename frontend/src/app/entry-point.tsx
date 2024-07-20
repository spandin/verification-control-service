import "@/shared/styles/globals.css"
import "react-toastify/dist/ReactToastify.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "./provider.tsx"
import IndexPage from "@/pages/index.tsx"
import { ToastContainer } from "react-toastify"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route element={<IndexPage />} path="/" />
        </Routes>
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
