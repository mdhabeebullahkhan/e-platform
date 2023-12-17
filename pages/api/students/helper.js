import StudentModel from '../../../models/studentsModel'
import * as log from "../../../middleware/log"

export const createStudent = async (student) => {
    try {
        const newStudent = new StudentModel(student);
        await newStudent.save();
    } catch (err) {
        log.error('Error occurred while createStudent: ', err);
        return 500;
    }
    return 200;
}