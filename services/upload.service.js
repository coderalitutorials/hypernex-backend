// import cloudinary from "../config/cloudinary.js";

// const uploadImage = async (file) => {
//   if (!file) {
//     throw new Error("No file provided");
//   }

//   const result = await cloudinary.uploader.upload(file.path, {
//     folder: "blogs",
//     resource_type: "image",
//   });

//   return {
//     url: result.secure_url,
//     public_id: result.public_id,
//   };
// };

// export { uploadImage };



// import cloudinary from "../config/cloudinary.js";

// const uploadImage = async (file) => {
//   if (!file || !file.buffer) throw new Error("No file provided");

//   const result = await cloudinary.uploader.upload_stream(
//     {
//       folder: "blogs",
//       resource_type: "image",
//     },
//     (error, result) => {
//       if (error) throw error;
//       return result;
//     }
//   );

//   // Using buffer
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: "blogs", resource_type: "image" },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve({
//           url: result.secure_url,
//           public_id: result.public_id,
//         });
//       }
//     );
//     stream.end(file.buffer);
//   });
// };

// export { uploadImage };



import cloudinary from "../config/cloudinary.js";

const uploadImage = async (file) => {
  if (!file) throw new Error("No file provided");

  try {
    // Agar diskStorage use ho to path bhejo, agar memoryStorage to buffer
    let uploadOptions = { folder: "blogs", resource_type: "image" };
    let result;

    if (file.path) {
      // diskStorage: direct path upload
      result = await cloudinary.uploader.upload(file.path, uploadOptions);
    } else if (file.buffer) {
      // memoryStorage: use upload_stream
      result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(file.buffer); // buffer ko stream me bhejna
      });
    } else {
      throw new Error("No valid file to upload");
    }

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(error.message || "Image upload failed");
  }
};

export { uploadImage };
