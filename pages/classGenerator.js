import Multiselect from 'multiselect-react-dropdown';
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { getData, putData } from "../utils/fetchData";

const ClassGenerator = () => {

    const initialState = {
        class: '',
        sections: [''],
        isNeeded: false,
    };

    const [options, setOptions] = useState([{ name: 'A', id: 1 }, { name: 'B', id: 2 }, { name: 'C', id: 3 }, { name: 'D', id: 4 }])

    // const [ClassName, setClassName] = useState('')
    const [id, setId] = useState('')
    console.log(id)

    const [selected, setSelected] = useState([])
    console.log(selected)

    const [classes, setClasses] = useState([initialState]);

    const [updateClasses, setUpdateClasses] = useState([]);
    // console.log(updateClasses)
    // const { Class, isNeeded } = classes
    const { Class, sections, isNeeded } = updateClasses
    const [checked, setChecked] = useState(false);
    console.log(checked)
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    useEffect(() => {
        getData('classes', auth.token)
            .then(res => {
                if (res.err) setClasses([]);
                else {
                    setClasses(res.classes);
                }
            })
    }, [])


    // const [change, setChange] = useState([])
    // const [remove, setRemove] = useState([])

    // console.log(selected)

    const handleChangeInput = async e => {
        e.preventDefault();
        const { name, value } = e.target;
        setUpdateClasses({ ...updateClasses, [e.target.name]: e.target.value });
        setSelected(options);
    }

    const handleCheckbox = (classItem) => {
        setId(classItem._id)
        setChecked(!checked)
        // setClasses({ ...classes, isNeeded: !checked })

    }

    const handleSubmit = async () => {

        if (id) {
            res = await putData(`classes/${id}`, { classes }, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            // dispatch(updateItem(categories, id, res.category, 'ADD_CATEGORIES'))
        }
    }

    return (
        <div className="container">
            <h2 style={{ marginTop: '3%' }}>Class Generator</h2>
            <form className="row my-3" onSubmit={handleSubmit}>
                <div className="table-responsive paper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Class or Grade</th>
                                <th>Section(s)</th>
                                <th>Action</th>
                                <th><button className="btn btn-outline-success"  >+</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                classes.map((classItem, index) => (
                                    <tr key={index + 1}>
                                        <td className='col-xl-2'>
                                            <input style={{ marginLeft: '10%', width: '20px', height: '20px' }}
                                                type="checkbox"
                                                checked={classItem.isNeeded}
                                                value={classItem.isNeeded}
                                                onChange={e=> handleCheckbox(classItem)}
                                            />
                                        </td>
                                        <td className='col-xl-5'><input type="text" value={classItem.class}
                                            className="form-control" name='Class'
                                            onChange={handleChangeInput}
                                            maxLength='25'
                                            required
                                        /> </td>
                                        <td className='col-xl-5'><Multiselect
                                            options={options} // Options to display in the dropdown
                                            onSelect={setSelected} // Preselected value to persist in dropdown
                                            onChange={handleChangeInput}// Function will trigger on select event
                                            // onRemove={setRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                        /></td>
                                    </tr>
                                ))}

                            {/* <tr>
                            <td className='col-xl-2'>                                
                                    <input style={{marginLeft:'10%',width:'20px',height:'20px'}}
                                        type="checkbox"
                                        // checked={checked}
                                        // value={accountneededcheck}
                                        // onChange={handleCheckbox}
                                    />                                
                                </td>
                                <td className='col-xl-5'><input type="text" name="class2"
                                    className="form-control"
                                    // onChange={handleChangeInput}
                                    maxLength='25'
                                    required
                                /> </td>
                                <td className='col-xl-5'><Multiselect
                                    options={options} // Options to display in the dropdown
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    // onChange={setSelected} Function will trigger on select event
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                /></td>
                            </tr>
                            <tr>
                            <td className='col-xl-2'>                                
                                    <input style={{marginLeft:'10%',width:'20px',height:'20px'}}
                                        type="checkbox"
                                        // checked={checked}
                                        // value={accountneededcheck}
                                        // onChange={handleCheckbox}
                                    />                                
                                </td>
                                <td className='col-xl-5'><input type="text" name="class3"
                                    className="form-control"
                                    // onChange={handleChangeInput}
                                    maxLength='25'
                                    required
                                /> </td>
                                <td className='col-xl-5'><Multiselect
                                    options={options} // Options to display in the dropdown
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    // onChange={setSelected} Function will trigger on select event
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                /></td>
                            </tr>
                            <tr>
                            <td className='col-xl-2'>                                
                                    <input style={{marginLeft:'10%',width:'20px',height:'20px'}}
                                        type="checkbox"
                                        // checked={checked}
                                        // value={accountneededcheck}
                                        // onChange={handleCheckbox}
                                    />                                
                                </td>
                                <td className='col-xl-5'><input type="text" name="class4"
                                    className="form-control"
                                    // onChange={handleChangeInput}
                                    maxLength='25'
                                    required
                                /> </td>
                                <td className='col-xl-5'><Multiselect
                                    options={options} // Options to display in the dropdown
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    // onChange={setSelected} Function will trigger on select event
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                /></td>
                            </tr>
                            <tr>
                            <td className='col-xl-2'>                                
                                    <input style={{marginLeft:'10%',width:'20px',height:'20px'}}
                                        type="checkbox"
                                        // checked={checked}
                                        // value={accountneededcheck}
                                        // onChange={handleCheckbox}
                                    />                                
                                </td>
                                <td className='col-xl-5'><input type="text" name="class5"
                                    className="form-control"
                                    // onChange={handleChangeInput}
                                    maxLength='25'
                                    required
                                /> </td>
                                <td className='col-xl-5'><Multiselect
                                    options={options} // Options to display in the dropdown
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    // onChange={setSelected} Function will trigger on select event
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                /></td>
                            </tr>
                            <tr>
                            <td className='col-xl-2'>                                
                                    <input style={{marginLeft:'10%',width:'20px',height:'20px'}}
                                        type="checkbox"
                                        // checked={checked}
                                        // value={accountneededcheck}
                                        // onChange={handleCheckbox}
                                    />                                
                                </td>
                                <td className='col-xl-5'><input type="text" name="class6"
                                    className="form-control"
                                    // onChange={handleChangeInput}
                                    maxLength='25'
                                    required
                                /> </td>
                                <td className='col-xl-5'><Multiselect
                                    options={options} // Options to display in the dropdown
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    // onChange={setSelected} Function will trigger on select event
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                /></td>
                            </tr>
                            <tr>
                            <td className='col-xl-2'>                                
                                    <input style={{marginLeft:'10%',width:'20px',height:'20px'}}
                                        type="checkbox"
                                        // checked={checked}
                                        // value={accountneededcheck}
                                        // onChange={handleCheckbox}
                                    />                                
                                </td>
                                <td className='col-xl-5'><input type="text" name="class7"
                                    className="form-control"
                                    // onChange={handleChangeInput}
                                    maxLength='25'
                                    required
                                /> </td>
                                <td className='col-xl-5'><Multiselect
                                    options={options} // Options to display in the dropdown
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    // onChange={setSelected} Function will trigger on select event
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                /></td>
                            </tr>
                            <tr>
                            <td className='col-xl-2'>                                
                                    <input style={{marginLeft:'10%',width:'20px',height:'20px'}}
                                        type="checkbox"
                                        // checked={checked}
                                        // value={accountneededcheck}
                                        // onChange={handleCheckbox}
                                    />                                
                                </td>
                                <td className='col-xl-5'><input type="text" name="class8"
                                    className="form-control"
                                    // onChange={handleChangeInput}
                                    maxLength='25'
                                    required
                                /> </td>
                                <td className='col-xl-5'><Multiselect
                                    options={options} // Options to display in the dropdown
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    // onChange={setSelected} Function will trigger on select event
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                /></td>
                            </tr>
                            <tr>
                            <td className='col-xl-2'>                                
                                    <input style={{marginLeft:'10%',width:'20px',height:'20px'}}
                                        type="checkbox"
                                        // checked={checked}
                                        // value={accountneededcheck}
                                        // onChange={handleCheckbox}
                                    />                                
                                </td>
                                <td className='col-xl-5'><input type="text" name="class9"
                                    className="form-control"
                                    // onChange={handleChangeInput}
                                    maxLength='25'
                                    required
                                /> </td>
                                <td className='col-xl-5'><Multiselect
                                    options={options} // Options to display in the dropdown
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    // onChange={setSelected} Function will trigger on select event
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                /></td>
                            </tr>
                            <tr>
                            <td className='col-xl-2'>                                
                                    <input style={{marginLeft:'10%', width:'20px',height:'20px'}}
                                        type="checkbox"
                                        // checked={checked}
                                        // value={accountneededcheck}
                                        // onChange={handleCheckbox}
                                    />                                
                                </td>
                                <td className='col-xl-5'><input type="text" name="class10"
                                    className="form-control"
                                    // onChange={handleChangeInput}
                                    maxLength='25'
                                    required
                                /> </td>
                                <td className='col-xl-5'><Multiselect
                                    options={options} // Options to display in the dropdown
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    // onChange={setSelected} Function will trigger on select event
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                /></td>
                            </tr> */}
                        </tbody>
                    </table>
                    <div className="row col-xl-12 mt-5 justify-content-center">
                        <button type="submit" className="btn btn-primary w-100" onClick={() => handleSubmit(ClassName)}>
                            Save  {/* {onEdit ? 'Update Student' : 'Save Student'} */}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default ClassGenerator