import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getCategoriesController,
} from "../controller/category.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getCategoriesController);

// ADMIN
router.post("/", authMiddleware, createCategoryController);
router.put("/:id", authMiddleware, updateCategoryController);
router.delete("/:id", authMiddleware, deleteCategoryController);

export default router;
