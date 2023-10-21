import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

let maskableIconURL = '/vite-maskable.svg'
let anyIconURL = '/vite-any.svg'
let pngIconURL = '/vite-icon.png'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [maskableIconURL, anyIconURL, pngIconURL, '/screenshot1.png'],
      manifest: {
        id: "com.yourapp.uniqueid",
        theme_color: '#ffffff',
        description: 'Tiff w-17',
        orientation: "portrait-primary",
    
        screenshots: [
          {
            src: "/screenshot1.png",
            sizes: "800x600",
            type: "image/png"
          }
        ],
        icons: [
          {
            src: maskableIconURL,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          },
          {
            src: anyIconURL,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: pngIconURL,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
    })
  ]
})
