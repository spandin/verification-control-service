import path from "path"

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa"

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
  },
  includeAssets: ["favicon.svg"],
  manifest: {
    name: "Verification Control Service",
    short_name: "VCS",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#f0f0f0",
    background_color: "#f0f0f0",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
}

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
    },
  },
  plugins: [react(), VitePWA(manifestForPlugin)],
})