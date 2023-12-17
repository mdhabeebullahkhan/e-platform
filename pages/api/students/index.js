import connectDB from '../../../utils/connectDB'
import StudentModel from '../../../models/studentsModel'
import UsersModel from '../../../models/usersModel'
import { CONTACT_ADMIN_ERR_MSG } from '../../../utils/constants'

connectDB()

/*
    GET     - Public
    POST    - Protected
*/

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getStudents(req, res)
            break;
        case "POST":
            await createStudents(req, res)
            break;
    }
}

const getStudents = async (req, res) => {
    try {
        const students = await StudentModel.find()
        res.json({ students })

    } catch (err) {
        console.error('Error occurred while getStudents: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
    }
}

const createStudents = async (req, res) => {
    const { firstname, middlename, lastname, dateofbirth, gender, age, rollno, admissionno, birthmark, emailid, feestatus, fathername, fatheroccupation, fathermobilenumber, mothername, motheroccupation, mothermobilenumber, religion, cast, mothertongue, aadharno, branch, Class, section, houseno, city, State, country, pincode, password, role, accountneededcheck } = req.body;

    try {

        if (accountneededcheck && emailid !== 'null' && role === 'student') {
            const newUser = new UsersModel({ email: emailid, password, role })
            await newUser.save()
            const user_Id = await UsersModel.findOne({ email: emailid })
            const userId = user_Id.id
            const newStudent = new StudentModel({ firstname, middlename, lastname, dateofbirth, gender, age, rollno, admissionno, birthmark, emailid, feestatus, fathername, fatheroccupation, fathermobilenumber, mothername, motheroccupation, mothermobilenumber, religion, cast, mothertongue, aadharno, branch, Class, section, houseno, city, State, country, pincode, accountneededcheck, userId })
            await newStudent.save()
        } else {
            const userId = null
            const newStudent = new StudentModel({ firstname, middlename, lastname, dateofbirth, gender, age, rollno, admissionno, birthmark, emailid, feestatus, fathername, fatheroccupation, fathermobilenumber, mothername, motheroccupation, mothermobilenumber, religion, cast, mothertongue, aadharno, branch, Class, section, houseno, city, State, country, pincode, accountneededcheck, userId })
            await newStudent.save()
        }
        res.json({ msg: 'Student Added Success!' });

    } catch (err) {
        console.error('Error occurred while getStudents: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
    }
}


