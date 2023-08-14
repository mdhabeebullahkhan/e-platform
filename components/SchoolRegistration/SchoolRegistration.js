import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'

const SchoolRegistration = () => {
    const { state } = useContext(DataContext)
    const { auth } = state
    const isAdmin = auth && auth.user && auth.user.role === 'admin'
    return (
        <div>
            <Link href={`../schoolRegistration`}>
                <div className="card">
                    {/* <img className="card-img-top" src="/schoolRegistration.jpg" /> */}
                    <div className="card-body">
                        <img width="60px" src="/school.png" />
                        <h6 className="card-title">
                            Edit School
                        </h6>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default SchoolRegistration