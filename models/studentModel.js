import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required: true,
    },
    admissionno: {
        type: String,
        required: true,
    },
    birthmark: {
        type: String,
        required: true,
    },
    emailid: {
        type: String,
        required: true,
    },
    feestatus: {
        type: String,
        required: true,
    },
    fathername: {
        type: String,
        required: true,
    },
    fatheroccupation: {
        type: String,
        required: true,
    },
    fathermobilenumber: {
        type: String,
        required: true,
    },
    mothername: {
        type: String,
        required: true,
    },
    motheroccupation: {
        type: String,
        required: true,
    },
    mothermobilenumber: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true,
    },
    cast: {
        type: String,
        required: true,
    },
    mothertongue: {
        type: String,
        required: true,
    },
    aadharno: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    Class: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    houseno: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    accountneededcheck: {
        type: Boolean,
    },
    userId: {
        type: String,
    },

}, {
    timestamps: true
})

let Dataset = mongoose.models.student || mongoose.model('student', studentSchema)
export default Dataset