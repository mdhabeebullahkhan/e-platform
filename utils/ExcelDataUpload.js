import ExcelJS from 'exceljs';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

async function loadExcelData(req, res) {
    let dataOutput={};
    try {
        const body = req.body;
        console.log('Data : ',body);
        const form = formidable({ multiples: true });
        
        const fileBuffer = req;
        form.parse(req, (err, fields, files) => {
            console.log('fields: ', fields);
            console.log('files: ', files);
           // res.send({ success: true });
        });
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
    workbook.eachSheet(sheet => {
        console.log(sheet.name);
        dataOutput.push(sheet.name);
      });

    

      return dataOutput;
    
  } catch (error) {
    throw error;
  }
}

export default loadExcelData;