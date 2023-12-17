import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema({
    section: {
        type: String,
    },
})

let Dataset = mongoose.models. section || mongoose.model('section', sectionSchema)
export default Dataset