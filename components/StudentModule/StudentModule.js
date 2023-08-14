import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'



const StudentModule = () => {
    const { state } = useContext(DataContext)
    const { auth } = state
    const isAdmin = auth && auth.user && auth.user.role === 'admin'
    
    return (
        <div>
            <Link href={`../students`}>
                <div className="card">
                    {/* <img className="card-img-top" src="/student.png" /> */}
                    <div className="card-body">
                    <img width="60px" src="/students.png" />

                        <h6 className="card-title">
                            {isAdmin ? 'Students' : 'View Students'}
                        </h6>
                    </div>
                </div></Link>
        </div>
    )
}
export default StudentModule