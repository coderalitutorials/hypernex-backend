import express from "express";
import { uploadImageController } from "../controller/upload.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";

const router = express.Router();

// POST /api/uploads/image
router.post(
  "/image",
  authMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController
);

export default router;
