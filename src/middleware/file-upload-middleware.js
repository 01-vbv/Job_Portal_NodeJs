import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/resume");
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename);
  },
});

export const uploadFile = multer({
  storage: storageConfig,
});
