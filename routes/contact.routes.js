import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controller/contact.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.post("/", createContact);

// ADMIN
router.get("/", authMiddleware, getAllContacts);
router.get("/:id", authMiddleware, getContactById);
router.put("/:id", authMiddleware, updateContactStatus);
router.delete("/:id", authMiddleware, deleteContact);

export default router;
