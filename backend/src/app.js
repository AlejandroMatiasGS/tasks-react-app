import authRoutes from './routes/auth-routes.js'
import taskRoutes from './routes/task-routes.js'
import express from 'express'
import cors from 'cors'
import { ALLOWED_HOSTS } from './config.js'


const app = express()

app.use(express.json())

app.use(cors({
    origin: ALLOWED_HOSTS,
    credentials: true,
}))

app.use("/api", authRoutes);
app.use("/api", taskRoutes)

export default app;