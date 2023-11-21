import Head from 'next/head';
import React, { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { uploader } from '../utils/Uploader';

export default function ExcelDataLoader() {
  const [excelData, setExcelData] = useState([]);
  const { state, dispatch } = useContext(DataContext)
  const { auth, notify } = state

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    try {
      if(file){
        const res = await uploader(`/api/uploads/data`, file, '/data', auth.token);
        if(res.err) console.error('Error uploading Excel data:', err);
        else if(res.data) setExcelData(data);
      }
    } catch (error) {
      console.error('Error loading Excel data:', error);
    }
  };

  return (
    <div>
         <Head>
                <title>Data Load</title>
            </Head>
      <input type="file" onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            {excelData[0] && excelData[0].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {excelData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
