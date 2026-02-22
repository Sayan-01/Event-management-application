"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controller/users");
const auth_1 = require("../middleware/auth");
const registrations_1 = require("../controller/registrations");
const router = express_1.default.Router();
router.get("/", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), users_1.getUsers);
router.get("/:id", auth_1.authenticate, users_1.getUserById);
router.put("/:id", auth_1.authenticate, users_1.updateUser);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), users_1.deleteUser);
router.get("/:id/tickets", auth_1.authenticate, registrations_1.getUserTickets);
exports.default = router;
