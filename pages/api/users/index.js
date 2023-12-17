import connectDB from '../../../utils/connectDB'
import UsersModel from '../../../models/usersModel'
import auth from '../../../middleware/auth'
import { CONTACT_ADMIN_ERR_MSG, ERROR_403 } from '../../../utils/constants'
import nc from 'next-connect'

connectDB()

/*
    GET     - Public
    POST    - Protected
*/

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            // await getStudents(req, res)
            break;
        case "POST":
            await createUsers(req, res)
            break;
    }
}

// const getStudents = async (req, res) => {
//     try {
//         const students = await StudentModel.find()
//         res.json({ students })

//     } catch (err) {
//         console.error('Error occurred while getStudents: ' + err);
//         return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
//     }
// }

const createUsers = async (req, res) => {
    console.log("CREATE USERS CALLED")
    const { email, password, role } = req.body;
    console.log("Email :" + email + "pass :" + password + "Role :" + role)
    try {

        const newUsers = new UsersModel({ email, password, role })
        await newUsers.save()
        res.json({ msg: "Users Added Success!" });


    } catch (err) {
        console.error('Error occurred while getUsers: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })

    }
}


