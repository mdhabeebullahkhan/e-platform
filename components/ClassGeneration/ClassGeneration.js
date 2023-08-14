
import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'

const ClassGeneration = () => {
    const { state } = useContext(DataContext)
    const { auth } = state
    const isAdmin = auth && auth.user && auth.user.role === 'admin'
    return (
        <div>
            <Link href={`../classGenerator`}>
                <div className="card">
                    {/* <img className="card-img-top" src="/" /> */}
                    <div className="card-body">
                        <img width="60px" src="/diagram.png" />
                        <h6 className="card-title">
                            {isAdmin ? 'Class Generator' : 'View Students'}
                        </h6>
                    </div>
                </div></Link>
        </div>
    )
}
export default ClassGeneration