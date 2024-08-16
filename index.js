import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connection from './config/db.js'
import userRouter from './routes/user.route.js'
import noteRouter from './routes/note.route.js'
import cors from 'cors'
import authorize from './middlewares/auth.middleware.js'
const app = express()
const PORT = process.env.PORT || 3002
app.use(express.json())
app.use('/user', userRouter)
app.use('/note', authorize, noteRouter)
app.use(cors({origin: "*"}))

app.get('/', (req, res) => {
    res.send('Server is running fine')
})


app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Server is running on port ${PORT} and connected to the DataBase`)
    } catch (error) {
        console.log(`Error while connecting to the DataBase ${error}`);
    }
})
