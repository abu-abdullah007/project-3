import express, { Express, Request, Response } from 'express'
import 'dotenv/config'
import userRouter from './routes/userRoutes'
import updateRouter from './routes/postRoutes'
const PORT = process.env.PORT
const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/user',userRouter)
app.use('/update',updateRouter)

app.use('*', (request: Request, response: Response) => {
    response.status(404).json({
        message:"this route not found",
        status:404,
        success:false
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})