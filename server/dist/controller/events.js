"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = exports.updateSession = exports.addSession = exports.getSessionsByEvent = exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEventById = exports.getEvents = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const Session_1 = __importDefault(require("../models/Session"));
// --- Event Controllers ---
const getEvents = async (req, res) => {
    try {
        const events = await Event_1.default.find({ status: "published" }).populate("venue");
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getEvents = getEvents;
const getEventById = async (req, res) => {
    try {
        const event = await Event_1.default.findById(req.params.id).populate("venue").populate("organizerId", "name email");
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        res.json(event);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getEventById = getEventById;
const createEvent = async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            organizerId: req.user?._id,
        };
        const event = new Event_1.default(eventData);
        await event.save();
        res.status(201).json(event);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createEvent = createEvent;
const updateEvent = async (req, res) => {
    try {
        const event = await Event_1.default.findById(req.params.id);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        Object.assign(event, req.body);
        await event.save();
        res.json(event);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (req, res) => {
    try {
        const event = await Event_1.default.findById(req.params.id);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        await Event_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteEvent = deleteEvent;
// --- Session Controllers ---
const getSessionsByEvent = async (req, res) => {
    try {
        const sessions = await Session_1.default.find({ eventId: req.params.id });
        res.json(sessions);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSessionsByEvent = getSessionsByEvent;
const addSession = async (req, res) => {
    try {
        const event = await Event_1.default.findById(req.params.id);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const session = new Session_1.default({ ...req.body, eventId: req.params.id });
        await session.save();
        res.status(201).json(session);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addSession = addSession;
const updateSession = async (req, res) => {
    try {
        const session = await Session_1.default.findById(req.params.sid);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        const event = await Event_1.default.findById(session.eventId);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        Object.assign(session, req.body);
        await session.save();
        res.json(session);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateSession = updateSession;
const deleteSession = async (req, res) => {
    try {
        const session = await Session_1.default.findById(req.params.sid);
        if (!session)
            return res.status(404).json({ message: "Session not found" });
        const event = await Event_1.default.findById(session.eventId);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        await Session_1.default.findByIdAndDelete(req.params.sid);
        res.json({ message: "Session deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteSession = deleteSession;
