import connectDB from '../../../utils/connectDB'
import TeacherModel from '../../../models/teacherModel'
import UsersModel from '../../../models/usersModel'
import auth from '../../../middleware/auth'
import { CONTACT_ADMIN_ERR_MSG, ERROR_401 } from '../../../utils/constants'
import nc from 'next-connect'

connectDB()

/*
    GET     - Public
    POST    - Protected
*/

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getTeachers(req, res)
            break;
        case "POST":
            await createTeachers(req, res)
            break;
    }
}

const getTeachers = async (req, res) => {
    try {
        const teachers = await TeacherModel.find()
        res.json({ teachers })

    } catch (err) {
        console.error('Error occurred while getTeachers: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
    }
}

const createTeachers = async (req, res) => {
    const { firstname, middlename, lastname, dateofbirth, age, gender, maritalstatus, contactnumber, emailid, religion, salary, branch, aadharno, fathername, mothername, houseno, city, State, country, pincode, password, role, accountneededcheck } = req.body;

    try {

        if (accountneededcheck && emailid !== 'null' && role === 'teacher') {
            const newUser = new UsersModel({ email: emailid, password, role })
            await newUser.save()
            const user_Id = await UsersModel.findOne({ email: emailid })
            const userId = user_Id.id
            const newTeacher = new TeacherModel({ firstname, middlename, lastname, dateofbirth, age, gender, maritalstatus, contactnumber, emailid, religion, salary, branch, aadharno, fathername, mothername, houseno, city, State, country, pincode, password, role, accountneededcheck, userId })
            await newTeacher.save()
        } else {
            const userId = null
            const newTeacher = new TeacherModel({ firstname, middlename, lastname, dateofbirth, age, gender, maritalstatus, contactnumber, emailid, religion, salary, branch, aadharno, fathername, mothername, houseno, city, State, country, pincode, password, role, accountneededcheck, userId })
            await newTeacher.save()
        }
        res.json({ msg: 'Teacher Added Success!' });

    } catch (err) {
        console.error('Error occurred while getTeachers: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })

    }
}


