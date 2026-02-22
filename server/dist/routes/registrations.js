"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registrations_1 = require("../controller/registrations");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.delete("/:id", auth_1.authenticate, registrations_1.cancelRegistration);
exports.default = router;
