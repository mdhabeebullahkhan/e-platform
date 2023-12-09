import Head from 'next/head';
import React, { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { uploader } from '../utils/Uploader';
import { CONTACT_ADMIN_ERR_MSG, FILE_UPLOAD_SUCESS } from '../utils/constants';
import { useEffect } from 'react';
import { isAdmin } from '../utils/util';
import { isLoggedInPopup } from '../components/SignIn/SignInCardFunctionalComponent';

export default function ExcelDataLoader() {
  const [excelData, setExcelData] = useState([]);
  const { state, dispatch } = useContext(DataContext)
  const { auth, notify } = state


  useEffect(() => {
    if (!auth) {
      isLoggedInPopup(auth, dispatch);
      isAdmin(auth, dispatch);
    }
  }, [auth])


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    try {
      if (file) {
        const res = await uploader(`/api/uploads/data`, file, '/data', auth.token);
        if (!res.ok) {
          dispatch({ type: 'NOTIFY', payload: { error: CONTACT_ADMIN_ERR_MSG } })
        } else {
          dispatch({ type: 'NOTIFY', payload: { success: FILE_UPLOAD_SUCESS } })
        }
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
    </div>
  );
}
