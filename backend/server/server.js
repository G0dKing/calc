const express = require('express');
const { createProxyMiddleware } = require("http-proxy-middleware")
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const path = require('path')
const morgan = require('morgan')

// Initialization
const app = express()

require("dotenv").config()
const NODE_PORT = process.env.NODE_PORT

//Middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:5000",
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: { "^/api": "/api" },
  })
);

// Rate-Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests. Try again in 15 minutes.'
});
app.use(limiter)

//Server
app.use( express.static(path.join(__dirname, "..", "..", "frontend", "dist"), {
    maxAge: '1d',
  })
)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "frontend", "dist", "index.html"), {
    cacheControl: true,
  })
})

app.listen(NODE_PORT, '0.0.0.0', () => console.log(`Listening at http://localhost:${NODE_PORT}`))
