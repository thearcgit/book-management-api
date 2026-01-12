import multer from "multer";

console.log('multer')
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "text/csv") {
      cb(new Error("Only CSV files are allowed"));
    }
    cb(null, true);
  }
});
