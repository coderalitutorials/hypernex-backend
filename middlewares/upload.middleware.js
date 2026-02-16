// import multer from "multer";

// // Memory storage (Cloudinary ke liye best)
// const storage = multer.memoryStorage();

// // File filter (sirf images)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Only image files are allowed"),
//       false
//     );
//   }
// };

// // Upload middleware
// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
//   fileFilter,
// });

// export default upload;


import multer from "multer";

// Memory storage for browser uploads
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

export default uploadMiddleware;
