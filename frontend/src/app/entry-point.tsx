import "@/shared/styles/globals.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "./provider.tsx"
import IndexPage from "@/pages/index.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route element={<IndexPage />} path="/" />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
