import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // Assuming your Node.js server is running on localhost:3000
        target: "http://localhost:3000",
        changeOrigin: true, // needed for virtual hosted sites
        secure: false, // if you have SSL/TLS setup set this to true
        ws: true, // proxy websockets if needed
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
