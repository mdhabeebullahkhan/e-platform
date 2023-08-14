import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema({
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
    maritalstatus: {
        type: String,
        required: true,
    },
    contactnumber: {
        type: String,
        required: true,
    },
    emailid: {
        type: String,
        required: true,
    },        
    religion: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    aadharno: {
        type: String,
        required: true,
    },
    fathername: {
        type: String,
        required: true,
    },
    mothername: {
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

let Dataset = mongoose.models.teacher || mongoose.model('teacher', teacherSchema)
export default Dataset