// routes/subscriberRoutes.js

import express from "express";
import { subscribeUser } from "../controller/subscriberController.js"

const router = express.Router();

// POST -> /api/subscribers/subscribe
router.post("/subscribe", subscribeUser);

export default router;
