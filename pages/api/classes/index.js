import connectDB from '../../../utils/connectDB'
import Classes from '../../../models/classesModel'
import auth from '../../../middleware/auth'
import { CONTACT_ADMIN_ERR_MSG, ERROR_403 } from '../../../utils/constants'

connectDB()

/*
    POST     - protected
    GET      - Public
*/

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getClasses(req, res)
            break;
    }
}

const getClasses = async (req, res) => {
    try {
        const classes = await Classes.find()
        res.json({ classes })
    } catch (err) {
        console.error('Error occurred while getClasses: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
    }
}