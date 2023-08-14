import mongoose from 'mongoose'

const sectionGenerationSchema = new mongoose.Schema({
    sections: {
        type: String,
    },
})

let Dataset = mongoose.models. sectionGeneration || mongoose.model('sectionGeneration', sectionGenerationSchema)
export default Dataset