import express from "express";
import { cancelRegistration } from "../controller/registrations";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.delete("/:id", authenticate, cancelRegistration);

export default router;
