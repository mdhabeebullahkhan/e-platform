import connectDB from '../../../utils/connectDB'
import StaffModel from '../../../models/staffModel'
import UsersModel from '../../../models/usersModel'
import auth from '../../../middleware/auth'
import { CONTACT_ADMIN_ERR_MSG, ERROR_403 } from '../../../utils/constants'

connectDB()
/*
    PUT     - protected
    DELETE  - protected
*/
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getTeacher(req, res)
            break;
        case "PUT":
            await updateTeacher(req, res)
            break;
        case "DELETE":
            await deleteTeacher(req, res)
            break;
    }
}



const getTeacher = async (req, res) => {
    try {
        const { id } = req.query;
        const teacher = await StaffModel.findById(id)
        if (!teacher) return res.status(400).json({ err: 'This teacher does not exist.' })
        console.log("Teacher :" + teacher)
        res.json({ teacher })

    } catch (err) {
        console.error('Error occurred while getTeacher: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
    }
}



const updateTeacher = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin') return res.status(401).json({ err: ERROR_403 })
        const { id } = req.query
        const { firstname, middlename, lastname, dateofbirth, age, gender, maritalstatus, contactnumber, emailid, religion, salary, branch, aadharno, fathername, mothername, houseno, city, State, country, pincode, password, role, accountneededcheck, userId } = req.body

        if (accountneededcheck) {

            if (userId !== null && userId !== undefined) {
                await StaffModel.findOneAndUpdate({ _id: id }, { firstname, middlename, lastname, dateofbirth, age, gender, maritalstatus, contactnumber, emailid, religion, salary, branch, aadharno, fathername, mothername, houseno, city, State, country, pincode, password, role, accountneededcheck })
                const teacherTableUserId = await StaffModel.findOne({ _id: id })
                const internalUserId = teacherTableUserId.userId
                await UsersModel.findOneAndUpdate({ _id: internalUserId }, { email: emailid })
            } else {
                const newUser = new UsersModel({ email: emailid, password: 'null', role: 'teacher' })
                await newUser.save()
                const user_Id = await UsersModel.findOne({ email: emailid })
                const userId = user_Id.id
                console.log("USER ID : " + userId)
                await StaffModel.findOneAndUpdate({ _id: id }, { firstname, middlename, lastname, dateofbirth, age, gender, maritalstatus, contactnumber, emailid, religion, salary, branch, aadharno, fathername, mothername, houseno, city, State, country, pincode, password, role, accountneededcheck, userId })
            }

        } else {
            if (userId == null) {
                await StaffModel.findOneAndUpdate({ _id: id }, { firstname, middlename, lastname, dateofbirth, age, gender, maritalstatus, contactnumber, emailid, religion, salary, branch, aadharno, fathername, mothername, houseno, city, State, country, pincode, password, role, accountneededcheck })
            } else {
                if (!accountneededcheck) {
                    //as accountneededcheck is false we need to delete user from userTable by taking userId from teacher table and update userId == null
                    const teacherTableUserId = await StaffModel.findOne({ _id: id })
                    const internalUserId = teacherTableUserId.userId
                    await UsersModel.findByIdAndDelete(internalUserId)
                    const userId = null
                    await StaffModel.findOneAndUpdate({ _id: id }, { firstname, middlename, lastname, dateofbirth, age, gender, maritalstatus, contactnumber, emailid, religion, salary, branch, aadharno, fathername, mothername, houseno, city, State, country, pincode, password, role, accountneededcheck, userId })
                }
            }

        }

        res.json({
            msg: "Teacher Updated Successfully.!",
            teacher: {
                // ...updatedTeacher._doc,
            }
        })
    } catch (err) {
        console.error('Error occurred while updateTeacher: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
    }
}

const deleteTeacher = async (req, res) => {
    try {

        const result = await auth(req, res)
        if (result.role !== 'admin') return res.status(401).json({ err: ERROR_403 })
        const { id } = req.query
        const teacherTable = await StaffModel.findOne({ _id: id })
        const teacherAccountNeededCheck = teacherTable.accountneededcheck
        console.log("NEED ONLINE ACCOUUNT CHECK : DELETE TEACHER CALLED " + teacherAccountNeededCheck)
        if (teacherAccountNeededCheck) {
            const teacherInternalId = teacherTable.userId
            await UsersModel.findByIdAndDelete(teacherInternalId)
            await StaffModel.findByIdAndDelete(id)
        } else {
            await StaffModel.findByIdAndDelete(id)
        }
        res.json({ msg: "Teacher Deleted Successfully" })

    } catch (err) {
        console.error('Error occurred while deleteTeacher: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
    }
}