import express from "express";
import {
  createServiceController,
  updateServiceController,
  deleteServiceController,
  getServicesController,
  getServiceByIdController,
} from "../controller/service.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getServicesController);
router.get("/:id", getServiceByIdController);

// ADMIN
router.post("/", authMiddleware, createServiceController);
router.put("/:id", authMiddleware, updateServiceController);
router.delete("/:id", authMiddleware, deleteServiceController);

export default router;
