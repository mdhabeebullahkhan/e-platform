import mongoose from 'mongoose'

const staffSchema = new mongoose.Schema({
    staffType:{
        type:String,
        required:true
    },
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
    maritalStatus: {
        type: Boolean,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },        
    religion: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    aadharNo: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
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
    joiningDate:Date,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
}, {
    timestamps: true
})

let Dataset = mongoose.models.staff || mongoose.model('staff', staffSchema)
export default Dataset