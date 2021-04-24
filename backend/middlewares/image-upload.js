const multer = require("multer");
const { v4: uuidv4 } = require("uuid");


const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const imageUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/imagenes')
    },
    filename: (req, file, cb) => {
      const extension = MIME_TYPE_MAP[file.mimetype]
      cb(null, uuidv4() + '.' + extension)
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype]
    let error = isValid ? null : new Error('Myme type no válido')
    cb(error, isValid)
  }
});

module.exports = imageUpload;
