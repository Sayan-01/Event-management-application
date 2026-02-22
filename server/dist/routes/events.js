"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_1 = require("../controller/events");
const auth_1 = require("../middleware/auth");
const registrations_1 = require("../controller/registrations");
const sponsors_1 = require("../controller/sponsors");
const exhibitors_1 = require("../controller/exhibitors");
const router = express_1.default.Router();
// --- Event Routes ---
router.get("/", events_1.getEvents);
router.get("/:id", events_1.getEventById);
router.post("/", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), events_1.createEvent);
router.put("/:id", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), events_1.updateEvent);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), events_1.deleteEvent);
// --- Session Routes ---
router.get("/:id/sessions", events_1.getSessionsByEvent);
router.post("/:id/sessions", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), events_1.addSession);
router.put("/:id/sessions/:sid", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), events_1.updateSession);
router.delete("/:id/sessions/:sid", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), events_1.deleteSession);
// --- Registration Routes (Nested) ---
router.post("/:id/register", auth_1.authenticate, (0, auth_1.authorize)(["attendee"]), registrations_1.registerForEvent);
router.get("/:id/attendees", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), registrations_1.getAttendeesByEvent);
// --- Sponsor Routes (Nested) ---
router.get("/:id/sponsors", sponsors_1.getSponsorsByEvent);
router.post("/:id/sponsors", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), sponsors_1.addSponsorshipPackage);
router.put("/:id/sponsors/:sid", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), sponsors_1.updateSponsor);
router.delete("/:id/sponsors/:sid", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), sponsors_1.removeSponsor);
router.post("/:id/sponsors/:sid/assets", auth_1.authenticate, (0, auth_1.authorize)(["sponsor", "admin"]), sponsors_1.uploadSponsorAssets);
// --- Exhibitor Routes (Nested) ---
router.get("/:id/exhibitors", exhibitors_1.getExhibitorsByEvent);
router.post("/:id/exhibitors", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), exhibitors_1.addExhibitor);
router.put("/:id/exhibitors/:eid", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "exhibitor", "admin"]), exhibitors_1.updateExhibitor);
router.delete("/:id/exhibitors/:eid", auth_1.authenticate, (0, auth_1.authorize)(["organizer", "admin"]), exhibitors_1.removeExhibitor);
exports.default = router;
