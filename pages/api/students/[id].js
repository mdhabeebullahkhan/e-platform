import connectDB from '../../../utils/connectDB'
import StudentModel from '../../../models/studentModel'
import UsersModel from '../../../models/usersModel'
import auth from '../../../middleware/auth'
import { CONTACT_ADMIN_ERR_MSG, ERROR_401 } from '../../../utils/constants'

connectDB()
/*
    PUT     - protected
    DELETE  - protected
*/
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getStudent(req, res)
            break;
        case "PUT":
            await updateStudent(req, res)
            break;
        case "DELETE":
            await deleteStudent(req, res)
            break;
    }
}



const getStudent = async (req, res) => {
    try {
        const { id } = req.query;
        const student = await StudentModel.findById(id)
        if (!student) return res.status(400).json({ err: 'This student does not exist.' })
        console.log("Student :" + student)
        res.json({ student })

    } catch (err) {
        console.error('Error occurred while getstudent: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
    }
}



const updateStudent = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin') return res.status(401).json({ err: ERROR_401 })
        const { id } = req.query
        const { firstname, middlename, lastname, dateofbirth, gender, age, rollno, admissionno, birthmark, emailid, feestatus, fathername, fatheroccupation, fathermobilenumber, mothername, motheroccupation, mothermobilenumber, religion, cast, mothertongue, aadharno, branch, Class, section, houseno, city, State, country, pincode, password, role, accountneededcheck, userId } = req.body

        if (accountneededcheck) {

            if (userId !== null && userId !== undefined) {
                await StudentModel.findOneAndUpdate({ _id: id }, { firstname, middlename, lastname, dateofbirth, gender, age, rollno, admissionno, birthmark, emailid, feestatus, fathername, fatheroccupation, fathermobilenumber, mothername, motheroccupation, mothermobilenumber, religion, cast, mothertongue, aadharno, branch, Class, section, houseno, city, State, country, pincode, accountneededcheck })
                const studentTableUserId = await StudentModel.findOne({ _id: id })
                const internalUserId = studentTableUserId.userId
                await UsersModel.findOneAndUpdate({ _id: internalUserId }, { email: emailid })
            } else {
                const newUser = new UsersModel({ email: emailid, password: 'null', role: 'student' })
                await newUser.save()
                const user_Id = await UsersModel.findOne({ email: emailid })
                const userId = user_Id.id
                console.log("USER ID : " + userId)
                await StudentModel.findOneAndUpdate({ _id: id }, { firstname, middlename, lastname, dateofbirth, gender, age, rollno, admissionno, birthmark, emailid, feestatus, fathername, fatheroccupation, fathermobilenumber, mothername, motheroccupation, mothermobilenumber, religion, cast, mothertongue, aadharno, branch, Class, section, houseno, city, State, country, pincode, accountneededcheck, userId })
            }

        } else {
            if (userId == null) {
                await StudentModel.findOneAndUpdate({ _id: id }, { firstname, middlename, lastname, dateofbirth, gender, age, rollno, admissionno, birthmark, emailid, feestatus, fathername, fatheroccupation, fathermobilenumber, mothername, motheroccupation, mothermobilenumber, religion, cast, mothertongue, aadharno, branch, Class, section, houseno, city, State, country, pincode, accountneededcheck })
            } else {
                if (!accountneededcheck) {
                    //as accountneededcheck is false we need to delete user from userTable by taking userId from student table and update userId == null
                    const studentTableUserId = await StudentModel.findOne({ _id: id })
                    const internalUserId = studentTableUserId.userId
                    await UsersModel.findByIdAndDelete(internalUserId)
                    const userId = null
                    await StudentModel.findOneAndUpdate({ _id: id }, { firstname, middlename, lastname, dateofbirth, gender, age, rollno, admissionno, birthmark, emailid, feestatus, fathername, fatheroccupation, fathermobilenumber, mothername, motheroccupation, mothermobilenumber, religion, cast, mothertongue, aadharno, branch, Class, section, houseno, city, State, country, pincode, accountneededcheck, userId })
                }
            }

        }

        res.json({
            msg: "Student Updated Successfully.!",
            student: {
                // ...updatedStudent._doc,
            }
        })
    } catch (err) {
        console.error('Error occurred while updateStudent: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
    }
}

const deleteStudent = async (req, res) => {
    try {

        const result = await auth(req, res)
        if (result.role !== 'admin') return res.status(401).json({ err: ERROR_401 })
        const { id } = req.query
        const studentTable = await StudentModel.findOne({ _id: id })
        const studAccountNeededCheck = studentTable.accountneededcheck
        console.log("NEED ONLINE ACCOUUNT CHECK : DELETE STUDENT CALLED " + studAccountNeededCheck)
        if (studAccountNeededCheck) {
            const studInternalId = studentTable.userId
            await UsersModel.findByIdAndDelete(studInternalId)
            await StudentModel.findByIdAndDelete(id)
        } else {
            await StudentModel.findByIdAndDelete(id)
        }
        res.json({ msg: "Student Deleted Successfully" })

    } catch (err) {
        console.error('Error occurred while deleteStudent: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
    }
}