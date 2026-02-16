import express from "express";
import {
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getBlogsController,
  getBlogBySlugController,
} from "../controller/blog.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getBlogsController);
router.get("/:slug", getBlogBySlugController);

// ADMIN
router.post("/", authMiddleware, createBlogController);
router.put("/:id", authMiddleware, updateBlogController);
router.delete("/:id", authMiddleware, deleteBlogController);

export default router;
