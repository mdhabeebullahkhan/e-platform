import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    root: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: 'avatar.png'
    },
    activated: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.users || mongoose.model('users', usersSchema)
export default Dataset