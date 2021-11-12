import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))

app.use('/auth', authRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`server is running on port ${PORT}`))
