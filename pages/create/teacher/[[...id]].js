import Head from 'next/head'
import { useState, useContext, useEffect, useRef } from 'react'
import { DataContext } from '../../../store/GlobalState'
import { postData, getData, putData } from '../../../utils/fetchData'
import { useRouter } from 'next/router'
import moment from 'moment';
import { isAdmin, isLoading } from '../../../utils/util'


const TeacherManager = () => {

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
    const router = useRouter()
    const [onEdit, setOnEdit] = useState(false)
    const [pageTitle, setpageTitle] = useState('Add New Teacher')
    const [teacher, setTeacher] = useState([initialState])
    const { firstname, middlename, lastname, dateofbirth, age, gender, maritalstatus, contactnumber, emailid, religion, salary, branch, aadharno, fathername, mothername, houseno, city, State, country, pincode, password, role, accountneededcheck } = teacher
    const { id } = router.query
    const [checked, setChecked] = useState(false);
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    console.log("Checked : " + checked)

    useEffect(() => {
        if (id) {
            setOnEdit(true)
            setpageTitle('Update Existing Teacher')
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

    const handleChangeInput = async e => {
        const { name, value } = e.target;
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    }

    const handleCheckbox = async e => {
        setChecked(!checked);
        setTeacher({ ...teacher, accountneededcheck: !checked })
    }

    const numRegex = /^[0-9]+$/;
    const handleSubmit = async (e) => {
        e.preventDefault();
        isAdmin(auth, dispatch);
        if (!(numRegex.test(age)) || !(age.length <= 2)) return dispatch({ type: 'NOTIFY', payload: { error: 'Please enter your correct Age.' } })
        if (gender == "" || gender == "-Select-") return dispatch({ type: 'NOTIFY', payload: { error: 'Please Select Gender.' } })
        if (!(numRegex.test(aadharno)) || !(aadharno.length == 12)) return dispatch({ type: 'NOTIFY', payload: { error: 'Please enter your correct Aadhar No.' } })
        if (maritalstatus == "" || maritalstatus == "-Select-") return dispatch({ type: 'NOTIFY', payload: { error: 'Please Select Marital Status.' } })
        if (!(numRegex.test(pincode))) return dispatch({ type: 'NOTIFY', payload: { error: 'Please enter correct PinCode.' } })

        isLoading(true, dispatch);
        let res;
        if (onEdit) {
            res = await putData(`teachers/${id}`, { ...teacher }, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            isLoading(false, dispatch);
            return router.push('/teachers')
        } else {
            res = await postData('teachers', teacher);
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            isLoading(false, dispatch);
            return router.push('/teachers')
        }
    }

    return (
        <div className="container products_manager">
            <Head>
                <title>SMS - Teacher Manager</title>
            </Head>
            <div className="border_login" style={{ marginTop: '3%' }}>
                <h2>{pageTitle}</h2>
                <form className="row my-3" onSubmit={handleSubmit}>
                    <div className=" col-xl-12">
                        <div className="">
                            <h4>Teacher Info</h4>
                            <div className="row">
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" name="firstname" value={firstname}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="middlename">Middle Name</label>
                                    <input type="text" name="middlename" value={middlename}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" name="lastname" value={lastname}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        maxLength='25'
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-2 mt-1 p-2">
                                    <label htmlFor="dateofbirth">Date Of Birth</label>
                                    <input type="date" name="dateofbirth" value={dateofbirth}
                                        placeholder="Date of Birth" className="form-control"
                                        onChange={handleChangeInput}
                                        max={moment().format("2018-01-01")}
                                        required
                                    />
                                </div>
                                <div className=" col-xl-1 mt-1 p-2">
                                    <label htmlFor="age">Age</label>
                                    <input type="text" name="age"
                                        className="form-control"
                                        onChange={handleChangeInput} value={age}
                                        required
                                    />
                                </div>
                                <div className=" col-xl-2 mt-1 p-2">
                                    <label htmlFor="gender">Gender</label>
                                    <select className="form-control custom-select text-capitalize" name="gender" value={gender}
                                        onChange={handleChangeInput} required>
                                        <option value="-Select-">-Select-</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className=" col-xl-2 mt-1 p-2">
                                    <label htmlFor="maritalstatus">Marital Status</label>
                                    <select className="form-control custom-select text-capitalize" name="maritalstatus" value={maritalstatus}
                                        onChange={handleChangeInput} required>
                                        <option value="-Select-">-Select-</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                    </select>
                                </div>
                                <div className=" col-xl-2 mt-1 p-2">
                                    <label htmlFor="contactnumber">Contact Number</label>
                                    <input type="text" name="contactnumber"
                                        className="form-control"
                                        onChange={handleChangeInput} value={contactnumber}
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="emailid">Email Id</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="emailid" value={emailid}
                                        onChange={handleChangeInput}
                                        maxLength='80'
                                        required
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="religion">Religion</label>
                                    <input type="text" name="religion" value={religion}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="salary">Salary</label>
                                    <input type="text" name="salary" value={salary}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="branch">Branch/Block</label>
                                    <input type="text" name="branch" value={branch}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="aadharno">Aadhar No</label>
                                    <input type="text" name="aadharno" value={aadharno}
                                        className="form-control"
                                        onChange={handleChangeInput}
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
                                    <input type="text" name="fathername" value={fathername}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="mothername">Mother Name</label>
                                    <input type="text" name="mothername" value={mothername}
                                        className="form-control"
                                        onChange={handleChangeInput}
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
                                    <input type="text" name="houseno" value={houseno}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-2 mt-1 p-2">
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" value={city}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-2 mt-1 p-2">
                                    <label htmlFor="State">State</label>
                                    <input type="text" name="State" value={State}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="country">Country</label>
                                    <input type="text" name="country" value={country}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        maxLength='25'
                                        required
                                    />
                                </div>
                                <div className="col-xl-2 mt-1 p-2">
                                    <label htmlFor="pincode">Pin Code</label>
                                    <input type="text" name="pincode" value={pincode}
                                        className="form-control"
                                        onChange={handleChangeInput}
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
                                    onChange={handleCheckbox}
                                />
                                <label style={{ marginLeft: '3%' }}> Account Needed</label>
                            </div>

                        </div>
                    </div>
                    <div className="row col-xl-12 mt-5 justify-content-center">
                        <button type="submit" className="btn btn-primary w-100">
                            {onEdit ? 'Update Student' : 'Save Student'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default TeacherManager