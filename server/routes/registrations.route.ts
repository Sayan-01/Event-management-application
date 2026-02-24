import express from "express";
import { cancelRegistration, getRegistrationById } from "../controller/registrations.controller";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/:id", authenticate, getRegistrationById);
router.delete("/:id", authenticate, cancelRegistration);

export default router;
