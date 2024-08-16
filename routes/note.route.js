import noteModel from "../models/note.model.js";
import express from 'express'
const noteRouter = express.Router()


noteRouter.post('/create', async (req, res) => {
    // if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    // console.log(req.body, req.user);
    
    const { title, content, status } = req.body;
    const userId = req.user._id
    try {
        const note = new noteModel({
            title,
            content,
            status,
            userId
        })
        await note.save()
        res.status(201).json({ message: `Note Created Successfully` })

    } catch (error) {
        res.status(500).json({ message: `Error Occured during Note Creation` })
    }
})


noteRouter.get('/', async (req, res) => {
    // if(!req.user) return res.status(401).json({ message: 'Unauthorized' })
    const userId = req.user._id
        try {
            const notes = await noteModel.find({userId})
            res.status(200).json({notes})
        } catch (error) {
            res.status(500).json({ message: `Error while fetching Notes ${error}` })
        }
})


noteRouter.patch('/update/:id', async (req, res) => {
    const payload = req.body
    const userId = req.user._id
    const noteId = req.params.id
    try {
        const note = await noteModel.findOne({_id: noteId})
        if(note.userId.toString() === userId.toString()){
            await noteModel.findByIdAndUpdate({_id: noteId}, payload)
            res.status(200).json({ message: `Note Updated Successfully`})
        }else{
            res.status(403).json({ message: 'Unauthorized to Update Note' })
        }

        // const note = await noteModel.findOneAndUpdate({ _id: noteId, userId }, payload, { new: true })
        // if (!note) return res.status(404).json({ message: 'Note Not Found' })
        // res.status(200).json({ message: 'Note Updated Successfully', note })
    } catch (error) {
        res.status(500).json({ message: `Error while updating Note ${error}` })
    }
})


noteRouter.delete('/delete/:id', async (req, res) => {
    const userId = req.user._id
    const noteId = req.params.id
    try {
        const note = await noteModel.findOne({_id: noteId})
        if(note.userId.toString() === userId.toString()){
            await noteModel.findByIdAndDelete({_id: noteId})
            res.status(200).json({ message: `Note Deleted Successfully`})
        }else{
            res.status(403).json({ message: 'Unauthorized to Delete Note' })
        }
        // const note = await noteModel.findByIdAndDelete({ _id: noteId, userId })
        // if (!note) return res.status(404).json({ message: 'Note Not Found' })
        // res.status(200).json({ message: 'Note Deleted Successfully', note })
    } catch (error) {
        res.status(500).json({ message: `Error while deleting Note ${error}` })
    }
})


export default noteRouter