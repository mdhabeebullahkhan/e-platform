import path from 'path';
import multer from 'multer';

const oneMegabyteInBytes = 1000000;


export const imgUpload = multer({
    limits: { fileSize: oneMegabyteInBytes * 2 },
    storage: multer.diskStorage({
      destination: './public/assets/images/product',
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
    fileFilter: function(req, file, cb){
      checkImgFileType(file, cb);
    }
  });

  export const dataFileUpload = multer({
    limits: { fileSize: oneMegabyteInBytes * 8 },
    storage: multer.memoryStorage({
     // destination: './public/assets/data',
      filename: (req, file, cb) => cb(null, file.originalname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9)),
    }),
    fileFilter: function(req, file, cb){
      checkDataFileType(file, cb);
    }
  });

  // Check Img File Type
function checkImgFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

  // Check Data File Type
function checkDataFileType(file, cb){
  // Allowed ext
  const filetypes = /text\/csv|application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet|xlsl|xls/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Excel Only!');
  }
}