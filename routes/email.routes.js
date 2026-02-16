




import express from "express";
import { sendContactEmail } from "../controller/email.controller.js";





const router = express.Router();

// POST /api/contact
router.post("/", sendContactEmail);

export default router;
