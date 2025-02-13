import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

const app = express()

dotenv.config({path: './.env'})
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/isHealthy", (req, res) => {
    return res.status(200).json({
        message: "API service healthy"
    })
})

import userRouter from "./routes/user.route.js"
app.use("/api/v1/user", userRouter)


export { app }