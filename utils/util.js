import moment from "moment";
import { ADMIN_ROLE, ERROR_403, PLEASE_LOG_IN, STUDENT_ROLE, TEACHER_ROLE, USER_ROLE } from "./constants";
import isEmpty from 'lodash/isEmpty';

export const renameFile = (originalFile, newName) => {
    return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
    });
}

export const isAdmin = (auth, dispatch) => {
    if (auth && auth.user && auth.user.role !== 'admin')
        return dispatch({ type: 'NOTIFY', payload: { error: ERROR_403 } })
}

export const isAdminUser = (auth) =>{
    return auth && auth.user && auth.user.role === 'admin';
 }
 
 export const isStudentRole = (role) => { return role === STUDENT_ROLE };
 export const isAdminRole = (role) => { return role === ADMIN_ROLE };
 export const isTeacherRole = (role) => { return role !== TEACHER_ROLE };

 
export const isLoggedIn = (auth, dispatch, router) => {
    if (isEmpty(auth)) {
        dispatch({ type: 'NOTIFY', payload: { error: PLEASE_LOG_IN } })
        router.push("/signin")
    }
}

export const isLoading = (loading, dispatch) => {
    dispatch({ type: 'NOTIFY', payload: { loading } })
}

export const formatDateTime = (date, format) => {
    return moment(date).format(format ? format : "LT, ll");
}