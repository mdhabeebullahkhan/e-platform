import moment from "moment"

export const studentHeader = [

    { Header: 'Admission No', accessor: 'admissionNo', size: 40, Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Roll No', accessor: 'rollNo', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'First Name', accessor: 'firstName', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Middle Name', accessor: 'middleName', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Last Name', accessor: 'lastName', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Father Name', accessor: 'fatherName', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'DOB', accessor: 'dob', Cell: props => {customDateFormatter(props.value)}, Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Class', accessor: 'class', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Section', accessor: 'section', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Fee Status', accessor: 'feeStatus', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Branch', accessor: 'branch', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Gender', accessor: 'gender', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Age', accessor: 'age', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Birth Mark', accessor: 'birthMark', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Email Id', accessor: 'emailId', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Aadhar No', accessor: 'aadharNo', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Address', accessor: 'address', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'City', accessor: 'city', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'State', accessor: 'state', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Country', accessor: 'country', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Pin Code', accessor: 'pinCode', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Father Occupation', accessor: 'fatherOccupation', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Father Mobile No', accessor: 'fatherMobileNo', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Mother Name', accessor: 'motherName', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Mother Occupation', accessor: 'motherOccupation', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Mother Mobile No', accessor: 'motherMobileNo', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Religion', accessor: 'religion', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Cast', accessor: 'cast', Filter: ({ column }) => <input {...column.getFilterProps} />, },
    { Header: 'Mother Tongue', accessor: 'motherTongue', Filter: ({ column }) => <input {...column.getFilterProps} />, },
]

const customDateFormatter = dateValue =>{
    return moment(dateValue).format('dd-MM-yyyy');
}