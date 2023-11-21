import { ERROR_403, PLEASE_LOG_IN } from "./constants";
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

export const isLoggedIn = (auth, dispatch, router) => {
    if (isEmpty(auth)) {
        dispatch({ type: 'NOTIFY', payload: { error: PLEASE_LOG_IN } })
        router.push("/signin")
    }
}

export const isLoading = (loading, dispatch) => {
    dispatch({ type: 'NOTIFY', payload: { loading } })
}