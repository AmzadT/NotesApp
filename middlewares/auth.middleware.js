import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'


const authorize = async (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1]
    try {
        if(!req.headers.authorization){
            return res.status(401).json({message: 'Token Not Found'})
        }
        if(!token){
           return res.status(401).json({message: 'Token Not Found'})
        }

        if(token){
            const decodedToken = jwt.verify(token, process.env.Secret_KEY)
            if(!decodedToken){
                return res.status(401).json({message: 'Invalid Token Please Login Again'})
            }
            const user = await userModel.findById(decodedToken.id)
            if(!user){
                return res.status(401).json({message: 'Unauthorized or User Not Found'})
            }
            req.user = user
            next()
        }
    } catch (error) {
        res.status(401).json({message: 'Invalid Token'})
    }
}

export default authorize