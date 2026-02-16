import { uploadImage } from "../services/upload.service.js";





const uploadImageController = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file provided",
      });
    }

    const uploaded = await uploadImage(file);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: uploaded,
    });
  } catch (error) {
    console.error("Upload controller error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Image upload failed",
    });
  }
};


export { uploadImageController };
