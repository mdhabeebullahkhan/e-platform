import connectDB from '../../../utils/connectDB'
import Classes from '../../../models/classesModel'
import auth from '../../../middleware/auth'
import { CONTACT_ADMIN_ERR_MSG, ERROR_403 } from '../../../utils/constants'

connectDB()
/*
    PUT     - protected
    DELETE  - protected
*/
export default async (req, res) => {
    switch (req.method) {
        case "PUT":
            await updateClasses(req, res)
            break;
    }
}

const updateClasses = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin') return res.status(401).json({ err: ERROR_403 })

        const { id } = req.query
        const { class1, class2, class3, class4, class5, class6, class7, class8, class9, class10 } = req.body

        const updateclasses = await Classes.findOneAndUpdate({ _id: id }, { class1, class2, class3, class4, class5, class6, class7, class8, class9, class10 })
        res.json({
            msg: "Success! Update a new category",
            category: {
                ...updateclasses._doc,
                
            }
        })
    } catch (err) {
        console.error('Error occurred while updateCategory: ' + err);
        return res.status(500).json({ err: CONTACT_ADMIN_ERR_MSG })
    }
}

