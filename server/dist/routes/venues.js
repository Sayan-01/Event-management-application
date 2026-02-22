"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const venues_1 = require("../controller/venues");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/", venues_1.getVenues);
router.post("/", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), venues_1.createVenue);
router.put("/:id", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), venues_1.updateVenue);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), venues_1.deleteVenue);
exports.default = router;
