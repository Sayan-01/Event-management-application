"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reports_1 = require("../controller/reports");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/events", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), reports_1.getEventStats);
router.get("/registrations", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), reports_1.getRegistrationStats);
router.get("/revenue", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), reports_1.getRevenueStats);
exports.default = router;
