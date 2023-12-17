import moment from "moment"


export const DEFAULT_COLUMN_WIDTH = 100;
export const studentHeader = [

    { Header: 'Admission No', accessor: 'admissionNo', size: 40, Filter: ({ column }) => defaultFilter(column, 80), width: 80 },
    { Header: 'Roll No', accessor: 'rollNo', Filter: ({ column }) => defaultFilter(column, 50), width: 50 },
    { Header: 'First Name', accessor: 'firstName', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Middle Name', accessor: 'middleName', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Last Name', accessor: 'lastName', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Father Name', accessor: 'fatherName', Filter: ({ column }) => defaultFilter(column, 180), width: 180},
    { Header: 'DOB', accessor: 'dob', Cell: props => customDateFormatter(props.value), Filter: ({ column }) => defaultFilter(column, 80), width: 80 },
    { Header: 'Class', accessor: 'class', Filter: ({ column }) => defaultFilter(column, 50), width: 50},
    { Header: 'Section', accessor: 'section', Filter: ({ column }) => defaultFilter(column, 50), width: 50 },
    { Header: 'Fee Status', accessor: 'feeStatus', Filter: ({ column }) => defaultFilter(column, 80), width: 80 },
    { Header: 'Admission Date', accessor: 'admissionDate', Cell: props => customDateFormatter(props.value), Filter: ({ column }) => defaultFilter(column, 90), width: 90 },
    { Header: 'Branch', accessor: 'branch', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Gender', accessor: 'gender', Filter: ({ column }) => defaultFilter(column, 50), width: 50 },
    { Header: 'Age', accessor: 'age', Filter: ({ column }) => defaultFilter(column, 40), width: 40 },
    { Header: 'Birth Mark', accessor: 'birthMark', Filter: ({ column }) => defaultFilter(column, 200), width: 200 },
    { Header: 'Email Id', accessor: 'emailId', Filter: ({ column }) => defaultFilter(column, 200), width: 200 },
    { Header: 'Aadhar No', accessor: 'aadharNo', Cell: props => aAdharNoFormatter(props.value), Filter: ({ column }) => defaultFilter(column, 120), width: 120 },
    { Header: 'Address', accessor: 'address', Filter: ({ column }) => defaultFilter(column, 150), width: 150 },
    { Header: 'City', accessor: 'city', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'State', accessor: 'state', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Country', accessor: 'country', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Pin Code', accessor: 'pinCode', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Father Occupation', accessor: 'fatherOccupation', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Father Mobile No', accessor: 'fatherMobileNo', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Mother Name', accessor: 'motherName', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Mother Occupation', accessor: 'motherOccupation', Filter: ({ column }) => defaultFilter(column, 150), width: 150 },
    { Header: 'Mother Mobile No', accessor: 'motherMobileNo', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Religion', accessor: 'religion', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Cast', accessor: 'cast', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
    { Header: 'Mother Tongue', accessor: 'motherTongue', Filter: ({ column }) => defaultFilter(column), width: DEFAULT_COLUMN_WIDTH },
]


const defaultFilter = (column, width) => {
    return <input {...column.getFilterProps} style={{ overflow:'hidden',width: (width ? width : DEFAULT_COLUMN_WIDTH) + 'px' }} />
}
const customDateFormatter = dateValue => {
    return moment(dateValue).format('DD-MM-yyyy');
}

const aAdharNoFormatter = value =>{
    return value;
}