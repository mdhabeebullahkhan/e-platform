import mongoose from 'mongoose'

const classesSchema = new mongoose.Schema({
    Class: {
        type: String,
    },
})

let Dataset = mongoose.models.classes || mongoose.model('classes', classesSchema)
export default Dataset