// pages/api/upload.js

import nextConnect from 'next-connect';
import ExcelJS from 'exceljs';
import { createStudent } from '../students/helper';
import { dataFileUpload } from './multer';
import * as log from "../../../middleware/log"
import { DATA_UPLOAD_ISSUE, FILE_UPLOAD_SUCESS } from '../../../utils/constants';

const data = nextConnect({
  onError(error, req, res) {
    log.error('Error occurred while data file upload: ', error);
    res.status(501).json({ error: `Data file upload Error: ${error}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

data.use(dataFileUpload.single('file'), async (req, res) => {
  try {
    log.info('---------------------------Uploading Data file-----------------------------------');
      // Load the Excel file from the buffer
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(req.file.buffer);

      const transitDataSheet = workbook.getWorksheet('transitData');
      let headers = [];
      let dataArr = [];
      transitDataSheet && transitDataSheet.eachRow((row, rowNo) => {
            //console.log('-------------rowNo ',rowNo,'-----------');
            if(rowNo !== 1){
                let student = {};
                if(headers){
                    headers.forEach((header, i)=>{
                        ++i;//To avoid first element which is empty element.
                        student[header] = ((i-1) < headers.length) ?  (row.values[i].result) ? row.values[i].result : '' : '';
                    });
                    dataArr.push(student);
                }
            }else{
                headers = row.values; 
                headers.shift();//removing empty element on first position.
                //console.log('headers: ',headers);
            }
      });
      log.debug('Upload student records : '+ dataArr.length);
      let failCount = 0;
      dataArr && dataArr.forEach(student => {
        const responseCode = createStudent(student);
        if(responseCode == 500) {
          ++failCount;
          log.error('Student data not inserted : '+student.firstName+' '+student.LastName)
        }
      });
      if(failCount > 0){
        log.error('failCount : '+failCount)
        res.status(500).json({ error: DATA_UPLOAD_ISSUE });
      }else{
        log.info(FILE_UPLOAD_SUCESS);
        res.status(200).json({ msg: FILE_UPLOAD_SUCESS });
      }
      log.info('------------------------------------------------------');
  } catch (error) {
    log.error('Error processing data file upload:', error);
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
