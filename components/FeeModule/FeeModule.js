
import Link from 'next/link'

const FeeModule = () => {

    return (
        <div>
            <Link href={`../students`}>
                <div className="card">
                    {/* <img className="card-img-top" src="/fee.pngsss" /> */}
                    <div className="card-body">
                        <img width="60px" src="/hand.png" />
                        <h6 className="card-title text-capitalize">
                            Fee Module
                        </h6>
                    </div>
                </div>
            </Link>
        </div>
    )

}
export default FeeModule