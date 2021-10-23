import multer from "multer";
export const processSingleFile = (fileField) => {
  const upload = multer({ storage: multer.memoryStorage() });
  return upload.single(fileField);
};
export const processMultiFiles = (filesField) => {
  const upload = multer({ storage: multer.memoryStorage() });
  return upload.array(filesField, 5);
};
