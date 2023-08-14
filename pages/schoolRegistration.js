import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { renameFile } from '../utils/util'
import Head from 'next/head'



const SchoolRegistration = () => {


    const initialSate = {
        avatar: '',
        name: '',
        schoolname:'',
        recognisedby:'',
        registrationnumber:'',
        address:'',



    }
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state
    const [data, setData] = useState(initialSate)
    const { avatar, name } = data
    const [checked, setChecked] = useState(false)
    const [branchDiable, setBranchDiable] = useState(true)


  
     let logoName = "logo";
    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if (!file)
            return dispatch({ type: 'NOTIFY', payload: { error: 'File does not exist!' } })

        if (file.size > 1024 * 1024) //1mb
            return dispatch({ type: 'NOTIFY', payload: { error: 'Image size should be less than 1MB!' } })

        if (file.type !== "image/jpeg" && file.type !== "image/png") //1mb
            return dispatch({ type: 'NOTIFY', payload: { error: 'Incorrect Image format! Please upload "jpeg/jpg/png" formats.' } })
        const fileExtn = file.name.split('.').pop();
        const renamedfile = renameFile(file, logoName + '.' + fileExtn);
        setData({ ...data, avatar: renamedfile })
    }


    const handleCheckbox = () => {
        setChecked(!checked)
        setBranchDiable(!branchDiable)
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        console.log("NAME : " + name)
    }

    if (!auth.user) return null;
    return (
        <div className="container">
            <h2 style={{ marginTop: '3%' }}>Register School</h2>

            <div className="table-responsive registration_page paper">
                <div className="row">
                    <div className="col-xl-4" />
                    <div className="col-xl-4">
                        <div className="avatar">
                            <img src={(avatar ? URL.createObjectURL(avatar) : auth.user.avatar)}
                                alt="avatar" />
                            <span>
                                <i className="fas fa-camera"></i>
                                <p>Change</p>
                                <input type="file" name="file" id="file_up"
                                    accept="image/*" onChange={changeAvatar} />
                            </span>
                        </div>
                        <h5 style={{ marginLeft: '15%' }}>Please Upload School Logo</h5>
                    </div>
                    <div className="col-xl-4" />
                </div>

                <div className="mt-1 p-2">
                    <label htmlFor="schoolname">School Name</label>
                    <input type="text" name="schoolname"
                        className="form-control"
                        onChange={handleChangeInput}
                        maxLength='25'
                        required
                    />
                </div>

                <div className="mt-1 p-2">
                    <label htmlFor="recognisedby">Recognised by the Govt of</label>
                    <input type="text" name="recognisedby"
                        className="form-control"
                        onChange={handleChangeInput}
                        maxLength='25'
                        required
                    />
                </div>
                <div className="mt-1 p-2">
                    <label htmlFor="registrationnumber">Registration Number</label>
                    <input type="text" name="registrationnumber"
                        className="form-control"
                        onChange={handleChangeInput}
                        maxLength='25'
                        required
                    />
                </div>

                <div className="mt-1 p-2">
                    <label htmlFor="address">Address</label>
                    <textarea className="form-control" rows="3" name="address"
                        onChange={handleChangeInput}
                        maxLength='60'
                        required >
                    </textarea>
                </div>

                <div className="mt-1 p-2">
                    <label htmlFor="checkbox"><strong>Do you have Branches ?</strong></label>
                    <input style={{ marginLeft: '2%', width: '20px', height: '20px' }}
                        type="checkbox"
                        checked={checked}
                        // value={classItem.isNeeded}
                        onChange={handleCheckbox}
                    />
                </div>
                <div className="mt-1 p-2">
                    <label htmlFor="branches">Branches (Please enter with comma separation)</label>
                    <input type="text" name="branches" placeholder='Block A, Block B,...' disabled={branchDiable}
                        className="form-control"
                        onChange={handleChangeInput}
                        maxLength='25'
                        required
                    />
                </div>
                <div className="row col-xl-12 mt-5 justify-content-center">
                    <button type="submit" className="btn btn-primary w-100" onClick={() => handleSubmit(ClassName)}>
                        Save
                    </button>
                </div>

            </div>
        </div>
    )

}
export default SchoolRegistration