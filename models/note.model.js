import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
},{
    timestamps: true,
    versionKey: false,
})

const noteModel = mongoose.model('Note', noteSchema)

export default noteModel;