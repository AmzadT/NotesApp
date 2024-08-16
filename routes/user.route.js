import express from 'express'
const userRouter = express.Router()
import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


userRouter.post('/register', async (req, res) => {
    const { name, age, email, password, gender } = req.body
    try {
        bcrypt.hash(password, 5, async (error, hash) => {
            if (error) {
                return res.status(500).json({ message: "Error occured during hashing password" })
            }
            const user = new userModel({
                name,
                age,
                email,
                password: hash,
                gender,
                // role: 'user'
            })
            await user.save()
            res.status(201).json({ message:`User registered successfully ` })
        })
    } catch (error) {
        res.status(500).json({ message: `Error occured during registration ${error}` })
    }
})



userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (error, result)=>{
                if(error){
                    return res.status(400).json({ message: "Invalid credentials" })
                }
                if(result){
                    const token = jwt.sign({ id: user._id }, process.env.Secret_KEY);
                    res.status(200).json({ message: `User logged in successfully`, token: token })
                }else{
                    res.status(400).json({ message: `Wrong password ` })
                }
            })
        }else{
            res.status(400).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: `Error occured during login ${error}` })
    }
})

export default userRouter;