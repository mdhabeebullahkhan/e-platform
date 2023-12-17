import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { deleteItem } from '../store/Actions'
import { deleteData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import { SIGN_IN } from '../utils/constants'


const Modal = () => {
    const { state, dispatch } = useContext(DataContext)
    const { modal, auth } = state

    const router = useRouter()

    const deleteUser = (item) => {
        dispatch(deleteItem(item.data, item.id, item.type))

        deleteData(`user/${item.id}`, auth.token)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            })
    }

    const deleteStudent = (item) => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        deleteData(`students/${item.id}`, auth.token)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                // return router.push('/')
            })
    }

    const deleteTeacher = (item) => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        deleteData(`teachers/${item.id}`, auth.token)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                // return router.push('/')
            })
    }

    const handleSubmit = () => {

        if (!modal.type) return;

        if (item.type === 'ADD_USERS') deleteUser(item)

        if (item.type === 'DELETE_STUDENT') deleteStudent(item)

        if (item.type === 'DELETE_TEACHER') deleteTeacher(item)

        dispatch({ type: 'ADD_MODAL', payload: {} })

    }

    return (
        <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{ maxWidth: modal.maxWidth ? modal.maxWidth : '500px' }} role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-capitalize" id="confirmModalLabel">
                            {modal.title}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {modal.content}
                    </div>
                    {
                        (modal.type !== SIGN_IN) && (
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleSubmit}>Yes</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Modal