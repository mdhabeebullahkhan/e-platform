
import { useEffect } from 'react'
import InfoModal from '../../components/InfoModal/respModal'
import { useRouter } from 'next/router'
import { useState, useContext, useRef } from 'react'
import { postData, getData, putData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'




const ViewStudent = (props) => {
  const initialState = {
    firstname: '',
    middlename: '',
    lastname: '',
    dateofbirth: '',
    gender: '',
    age: '',
    rollno: '',
    admissionno: '',
    birthmark: '',
    emailid: '',
    feestatus: '',
    fathername: '',
    fatheroccupation: '',
    fathermobilenumber: '',
    mothername: '',
    motheroccupation: '',
    mothermobilenumber: '',
    religion: '',
    cast: '',
    mothertongue: '',
    aadharno: '',
    branch: '',
    Class: '',
    section: '',
    houseno: '',
    city: '',
    State: '',
    country: '',
    pincode: '',
    accountneededcheck: false,

  }
  const { state } = useContext(DataContext)
  const { auth } = state
  const isAdmin = auth && auth.user && auth.user.role === 'admin'
  const id = props.id
  const [student, setstudent] = useState([initialState])
  const { firstname, middlename, lastname, dateofbirth, gender, age, rollno, admissionno, birthmark, emailid, feestatus, fathername, fatheroccupation, fathermobilenumber, mothername, motheroccupation, mothermobilenumber, religion, cast, mothertongue, aadharno, branch, Class, section, houseno, city, State, country, pincode, accountneededcheck } = student
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (id) {
      getData(`students/${id}`, auth.token)
        .then(res => {
          if (res.err) setstudent([]);
          else {
            // setstudent(res.students);
            setstudent({ ...res.student })
          }
        })
    } else {
      setOnEdit(false)
      setstudent({ ...initialState })
    }
  }, [id])

  useEffect(() => { setChecked(accountneededcheck) }, [accountneededcheck])

  return (

    <div>
      <div className=" col-xl-12">

        <form className="row my-3">
                    <div className=" col-xl-12">
                        <div className="">
                            <h4>Student Info</h4>
                            <div className="row">
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" name="firstname" value={firstname}
                                        className="form-control"
                                        readOnly= {true}
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="middlename">Middle Name</label>
                                    <input type="text" name="middlename" value={middlename}
                                        className="form-control"
                                        readOnly= {true}
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" name="lastname" value={lastname}
                                        className="form-control"
                                         readOnly= {true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-2 mt-1 p-2">
                                <label htmlFor="dateofbirth">Date Of Birth</label>
                                <input type="date" name="dateofbirth" value={dateofbirth}
                                    placeholder="Date of Birth" className="form-control" 
                                     readOnly= {true}
                                />
                            </div>
                            <div className=" col-xl-1 mt-1 p-2">
                                <label htmlFor="age">Age</label>
                                <input type="text" name="age"
                                    className="form-control"
                                     value={age}
                                     readOnly= {true}
                                />
                            </div>
                            <div className=" col-xl-2 mt-1 p-2">
                                <label htmlFor="gender">Gender</label>
                                <select className="form-control custom-select text-capitalize" name="gender" value={gender}
                                      disabled="disabled">
                                    <option value="-Select-">-Select-</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="col-xl-3 mt-1 p-2">
                                <label htmlFor="birthmark">Birth Mark</label>
                                <input type="text" name="birthmark" value={birthmark}
                                    className="form-control"
                                     readOnly= {true}
                                />
                            </div>
                            <div className="col-xl-4 mt-1 p-2">
                                <label htmlFor="emailid">Email Id</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="emailid" value={emailid}
                                     readOnly= {true}
                                />
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-xl-3 mt-1 p-2">
                                <label htmlFor="religion">Religion</label>
                                <input type="text" name="religion" value={religion}
                                    className="form-control"
                                   
                                    maxLength='30'
                                     readOnly= {true}
                                />
                            </div>
                            <div className="col-xl-2 mt-1 p-2 ">
                                <label htmlFor="cast">Cast</label>
                                <select className="form-control custom-select text-capitalize" name="cast" value={cast} disabled="disabled">
                                    <option value="-Select-">-Select-</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                    <option value="BC">BC</option>
                                    <option value="OBC">OBC</option>
                                </select>
                            </div>
                            <div className="col-xl-3 mt-1 p-2">
                                <label htmlFor="mothertongue">Mother Tongue</label>
                                <input type="text" name="mothertongue" value={mothertongue}
                                    className="form-control"
                                     readOnly= {true}
                                />
                            </div>
                            <div className="col-xl-4 mt-1 p-2">
                                <label htmlFor="aadharno">Aadhar No</label>
                                <input type="text" name="aadharno" value={aadharno}
                                    className="form-control"
                                     readOnly= {true}
                                />
                            </div>

                        </div>

                        <hr style={{ height: '1px', width: '98%', backgroundColor: '#144271' }} />

                        <div className="">
                            <div>
                                <h4>Admission Info</h4>
                                <div className="row">
                                    <div className="col-xl-2 mt-1 p-2">
                                        <label htmlFor="branch">Branch/Block</label>
                                        <input type="text" name="branch" value={branch}
                                            className="form-control"
                                             readOnly= {true}
                                        />
                                    </div>
                                    <div className="col-xl-2 mt-1 p-2">
                                        <label htmlFor="admissionno">Admission No</label>
                                        <input type="text" name="admissionno" value={admissionno}
                                            className="form-control"
                                             readOnly= {true}
                                        />
                                    </div>
                                    <div className="col-xl-2  mt-1 p-2">
                                        <label htmlFor="Class">Class</label>
                                        <select className="form-control custom-select text-capitalize" name="Class" value={Class} disabled="disabled">
                                            <option value="-Select-">-Select-</option>
                                            <option value="1st">1st</option>
                                            <option value="2nd">2nd</option>
                                            <option value="3rd">3rd</option>
                                            <option value="4th">4th</option>
                                            <option value="5th">5th</option>
                                            <option value="6th">6th</option>
                                            <option value="7th">7th</option>
                                            <option value="8th">8th</option>
                                            <option value="9th">9th</option>
                                            <option value="10th">10th</option>
                                            <option value="11th">11th</option>
                                            <option value="12th">12th</option>
                                        </select>
                                    </div>
                                    <div className="col-xl-2  mt-1 p-2">
                                        <label htmlFor="section">Section</label>

                                        <select className="form-control custom-select text-capitalize" name="section" value={section} disabled="disabled">
                                            <option value="-Select-">-Select-</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </select>

                                    </div>
                                    <div className="col-xl-2 mt-1 p-2">
                                        <label htmlFor="feestatus">Fee Status</label>

                                        <select className="form-control custom-select text-capitalize" name="feestatus" value={feestatus} disabled="disabled" >
                                            <option value="-Select-">-Select-</option>
                                            <option value="Regular">Regular</option>
                                            <option value="Scholarship">Scholarship</option>
                                            <option value="Aided">Aided</option>
                                        </select>

                                    </div>
                                    <div className="  col-xl-2 mt-1 p-2">
                                        <label htmlFor="rollno">Roll No</label>
                                        <input type="text" name="rollno"
                                            className="form-control"
                                            value={rollno}
                                             readOnly= {true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr style={{ height: '1px', width: '98%', backgroundColor: '#144271' }} />

                            <h4>Parents Info</h4>
                            <div className="row">

                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="fathername">Father Name</label>
                                    <input type="text" name="fathername" value={fathername}
                                        className="form-control"
                                         readOnly= {true}
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="fatheroccupation">Father's Occupation</label>
                                    <input type="text" name="fatheroccupation" value={fatheroccupation}
                                        className="form-control"
                                         readOnly= {true}
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="fathermobilenumber">Father's Mobile No</label>
                                    <input type="text" name="fathermobilenumber" value={fathermobilenumber}
                                        className="form-control"
                                         readOnly= {true}
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="mothername">Mother Name</label>
                                    <input type="text" name="mothername" value={mothername}
                                        className="form-control"
                                         readOnly= {true}
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="motheroccupation">Mother's Occupation</label>
                                    <input type="text" name="motheroccupation" value={motheroccupation}
                                        className="form-control"
                                         readOnly= {true}
                                    />
                                </div>
                                <div className="col-xl-4 mt-1 p-2">
                                    <label htmlFor="mothermobilenumber">Mother's Mobile No</label>
                                    <input type="text" name="mothermobilenumber" value={mothermobilenumber}
                                        className="form-control"
                                         readOnly= {true}
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
                                         readOnly= {true}
                                    />
                                </div>
                                <div className="col-xl-2 mt-1 p-2">
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" value={city}
                                        className="form-control"
                                         readOnly= {true}
                                    />
                                </div>
                                <div className="col-xl-2 mt-1 p-2">
                                    <label htmlFor="State">State</label>
                                    <input type="text" name="State" value={State}
                                        className="form-control"
                                         readOnly= {true}
                                    />
                                </div>
                                <div className="col-xl-3 mt-1 p-2">
                                    <label htmlFor="country">Country</label>
                                    <input type="text" name="country" value={country}
                                        className="form-control"
                                         readOnly= {true}
                                    />
                                </div>
                                <div className="col-xl-2 mt-1 p-2">
                                    <label htmlFor="pincode">Pin Code</label>
                                    <input type="text" name="pincode" value={pincode}
                                        className="form-control" 
                                         readOnly= {true}
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
                                    readOnly= {true}                                   
                                />
                                <label style={{marginLeft:'3%'}}> Account Needed</label>
                            </div>
                        </div>
                    </div>  
                </form>
      </div>
    </div>
  )
}
export default ViewStudent