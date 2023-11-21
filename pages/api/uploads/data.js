// pages/api/upload.js

import nextConnect from 'next-connect';
import { Formidable } from "formidable";
import fs from 'fs';
import ExcelJS from 'exceljs';
import StudentsModel from '../../../models/studentsModel'
import { createStudent } from '../students/helper';

const data = nextConnect();

data.post(async (req, res) => {
  try {
    const form = new Formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const fileBuffer = fs.readFileSync(files.file[0].filepath);

      // Load the Excel file from the buffer
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(fileBuffer);

      const transitDataSheet = workbook.getWorksheet('transitData');
      let headers = [];
      let transitedStudents = [];
      transitDataSheet && transitDataSheet.eachRow((row, rowNo) => {
            //console.log('-------------rowNo ',rowNo,'-----------');
            if(rowNo !== 1){
                let student = {};
                if(headers){
                    headers.forEach((header, i)=>{
                        ++i;//To avoid first element which is empty element.
                        student[header] = ((i-1) < headers.length) ?  (row.values[i].result) ? row.values[i].result : '' : '';
                    });
                    transitedStudents.push(student);
                }
            }else{
                headers = row.values; 
                headers.shift();//removing empty element on first position.
                //console.log('headers: ',headers);
            }
      });
      console.log('Transited student length : ', transitedStudents.length);
      transitedStudents && transitedStudents.forEach(student => createStudent(student));
      res.status(200).json({ message: 'File uploaded successfully.' });
    });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//set bodyparser
export const config = {
    api: {
      bodyParser: false
    }
  }

export default data;
