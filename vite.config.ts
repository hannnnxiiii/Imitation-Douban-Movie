import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import vue from "@vitejs/plugin-vue"
import ElementPlus from "unplugin-element-plus/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({}),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 添加 server 配置来处理跨域问题
  server: {
    proxy: {
      // 配置代理，使用 /api 作为前缀
      "/api": {
        target: "https://api.douban.com", // 目标 API 地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => {
          console.log("Rewriting API1 path:", path)
          return path.replace(/^\/api/, "")
        }, // 将 /api 替换为空
      },
      "/douban": {
        target: "https://movie.douban.com",
        changeOrigin: true,
        rewrite: (path) => {
          console.log("Rewriting API2 path:", path)
          return path.replace(/^\/douban/, "")
        },
      },
    },
  },
  base: "/imitation-douban-movie/",
})
