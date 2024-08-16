import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const connection = mongoose.connect(process.env.Mongo_URL)

export default connection;