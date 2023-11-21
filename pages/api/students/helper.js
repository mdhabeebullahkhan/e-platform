import StudentModel from '../../../models/studentsModel'

export const createStudent = async (student) => {
    try {
        const newStudent = new StudentModel(student);
        await newStudent.save();
    } catch (err) {
        console.error('Error occurred while createStudent: ' + err);
        return 500;
    }
    return 200;
}