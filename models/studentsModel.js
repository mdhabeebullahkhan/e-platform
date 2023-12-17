import mongoose from 'mongoose'

const studentsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
    },
    admissionNo: {
        type: String,
        required: true,
    },
    admissionDate:{
        type: Date,
        required: true
    },
    birthMark: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    feeStatus: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherMobileNo: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true,
    },
    motherMobileNo: {
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
    motherTongue: {
        type: String,
        required: true,
    },
    aadharNo: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pinCode: {
        type: String,
        required: true,
    },
    accountRequired: {
        type: Boolean,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }

}, {
    timestamps: true
})

let Dataset = mongoose.models.students || mongoose.model('students', studentsSchema)
export default Dataset