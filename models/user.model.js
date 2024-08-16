import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
        // minlength: 5,
        // maxlength: 20
    },
    password: {
        type: String,
        required: true,
        // minlength: 8,
        // maxlength: 100
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    age: {
        type: Number,
        required: true,
        // min: 18,
        // max: 99
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
        // default: 'Male'
    },
    // role: {
    //     type: String,
    //     enum: ['user', 'admin'],
    //     default: 'user'
    // },
    // isActive: {
    //     type: Boolean,
    //     default: true
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
}, {
    timestamps: true,
    versionKey: false,
})

const userModel = mongoose.model('User', userSchema)

export default userModel;