import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'

const AddTeacher = () => {
    const { state } = useContext(DataContext)
    const { auth } = state
    const isAdmin = auth && auth.user && auth.user.role === 'admin'
    return (
        <div>
            <Link href={`../teachers`}>
                <div className="card">
                    {/* <img className="card-img-top" src="/teacher.jpg" /> */}
                    <div className="card-body">
                        <img width="60px" src="/team.png" />
                        <h6 className="card-title">
                            {isAdmin ? 'Teachers' : 'View Teachers'}
                        </h6>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default AddTeacher