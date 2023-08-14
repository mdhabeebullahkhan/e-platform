
import { useEffect } from 'react'
import InfoModal from '../../components/InfoModal/respModal'
import { useRouter } from 'next/router'
import { useState, useContext, useRef } from 'react'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'




const ViewTeacher = (props) => {
    const initialState = {
        firstname: '',
        middlename: '',
        lastname: '',
        dateofbirth: '',
        age: '',
        gender: '',
        maritalstatus: '',
        contactnumber: '',
        emailid: '',
        religion: '',
        salary: '',
        branch: '',
        aadharno: '',
        fathername: '',
        mothername: '',
        houseno: '',
        city: '',
        State: '',
        country: '',
        pincode: '',
        password: 'null',
        role: 'teacher',
        accountneededcheck: false,

    }
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state
    const isAdmin = auth && auth.user && auth.user.role === 'admin'
    const id = props.id
    const [teacher, setTeacher] = useState([initialState])
    const { firstname, middlename, lastname, dateofbirth, age, gender, maritalstatus, contactnumber, emailid, religion, salary, branch, aadharno, fathername, mothername, houseno, city, State, country, pincode, password, role, accountneededcheck } = teacher
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (id) {

            getData(`teachers/${id}`, auth.token)
                .then(res => {
                    if (res.err) setTeacher([]);
                    else {
                        setTeacher({ ...res.teacher })
                    }
                })
        } else {
            setOnEdit(false)
            setTeacher({ ...initialState })
        }
    }, [id])

    useEffect(() => { setChecked(accountneededcheck) }, [accountneededcheck])

    return (

        <div>
            <div className=" col-xl-12">
                <form className="row my-3">
                    <div className=" col-xl-12">
                        <div className="">
                            <h4>Teacher Info</h4>
                            <div className="row">
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" name="firstname" value={firstname} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="middlename">Middle Name</label>
                                    <input type="text" name="middlename" value={middlename} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" name="lastname" value={lastname} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-2 mt-1 p-2">
                                    <label htmlFor="dateofbirth">Date Of Birth</label>
                                    <input type="date" name="dateofbirth" value={dateofbirth} readOnly={true}
                                        placeholder="Date of Birth" className="form-control"
                                        required
                                    />
                                </div>
                                <div className=" col-xl-1 mt-1 p-2">
                                    <label htmlFor="age">Age</label>
                                    <input type="text" name="age" readOnly={true}
                                        className="form-control"
                                        value={age}
                                        required
                                    />
                                </div>
                                <div className=" col-xl-2 mt-1 p-2">
                                    <label htmlFor="gender">Gender</label>
                                    <select className="form-control custom-select text-capitalize" name="gender" value={gender}
                                        disabled="disabled" required>
                                        <option value="-Select-">-Select-</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className=" col-xl-2 mt-1 p-2">
                                    <label htmlFor="maritalstatus">Marital Status</label>
                                    <select className="form-control custom-select text-capitalize" name="maritalstatus" value={maritalstatus}
                                        disabled="disabled" required>
                                        <option value="-Select-">-Select-</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                    </select>
                                </div>
                                <div className=" col-xl-2 mt-1 p-2">
                                    <label htmlFor="contactnumber">Contact Number</label>
                                    <input type="text" name="contactnumber" readOnly={true}
                                        className="form-control"
                                        value={contactnumber}
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="emailid">Email Id</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="emailid" value={emailid} readOnly={true}
                                        maxLength='80'
                                        required
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="religion">Religion</label>
                                    <input type="text" name="religion" value={religion} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="salary">Salary</label>
                                    <input type="text" name="salary" value={salary} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="branch">Branch/Block</label>
                                    <input type="text" name="branch" value={branch} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="aadharno">Aadhar No</label>
                                    <input type="text" name="aadharno" value={aadharno} readOnly={true}
                                        className="form-control"
                                        maxLength='30'
                                        required
                                    />
                                </div>
                            </div>

                            <hr style={{ height: '1px', width: '98%', backgroundColor: '#144271' }} />

                            <h4>Parents Info</h4>
                            <div className="row">
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="fathername">Father Name</label>
                                    <input type="text" name="fathername" value={fathername} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="mothername">Mother Name</label>
                                    <input type="text" name="mothername" value={mothername} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                            </div>

                            <hr style={{ height: '1px', width: '98%', backgroundColor: '#144271' }} />

                            <h4>Address Info</h4>
                            <div className="row">
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="houseno">House No</label>
                                    <input type="text" name="houseno" value={houseno} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-2 mt-1 p-2">
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" value={city} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-2 mt-1 p-2">
                                    <label htmlFor="State">State</label>
                                    <input type="text" name="State" value={State} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="country">Country</label>
                                    <input type="text" name="country" value={country} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-2 mt-1 p-2">
                                    <label htmlFor="pincode">Pin Code</label>
                                    <input type="text" name="pincode" value={pincode} readOnly={true}
                                        className="form-control"
                                        maxLength='25'
                                        required
                                    />
                                </div>
                            </div>

                            <hr style={{ height: '1px', width: '98%', backgroundColor: '#144271' }} />

                            <h4>Need Online Account</h4>
                            <div className="col-xl-2 mt-1 p-2">

                                <input
                                    type="checkbox"
                                    checked={checked}
                                    value={accountneededcheck}
                                    readOnly={true}
                                />
                                <label style={{ marginLeft: '3%' }}> Account Needed</label>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ViewTeacher