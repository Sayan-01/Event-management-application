"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeExhibitor = exports.updateExhibitor = exports.addExhibitor = exports.getExhibitorsByEvent = void 0;
const Exhibitor_1 = __importDefault(require("../models/Exhibitor"));
const Event_1 = __importDefault(require("../models/Event"));
const getExhibitorsByEvent = async (req, res) => {
    try {
        const exhibitors = await Exhibitor_1.default.find({ eventId: req.params.id, status: "confirmed" });
        res.json(exhibitors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getExhibitorsByEvent = getExhibitorsByEvent;
const addExhibitor = async (req, res) => {
    try {
        const event = await Event_1.default.findById(req.params.id);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const exhibitor = new Exhibitor_1.default({ ...req.body, eventId: req.params.id });
        await exhibitor.save();
        res.status(201).json(exhibitor);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addExhibitor = addExhibitor;
const updateExhibitor = async (req, res) => {
    try {
        const exhibitor = await Exhibitor_1.default.findById(req.params.eid);
        if (!exhibitor)
            return res.status(404).json({ message: "Exhibitor not found" });
        const event = await Event_1.default.findById(exhibitor.eventId);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        // Allowed for Organizer, Admin, or the Exhibitor themselves
        const isOwner = exhibitor.userId.toString() === req.user?._id.toString();
        const isOrganizer = event.organizerId.toString() === req.user?._id.toString();
        const isAdmin = req.user?.role === "admin";
        if (!isOwner && !isOrganizer && !isAdmin) {
            return res.status(403).json({ message: "Access denied" });
        }
        Object.assign(exhibitor, req.body);
        await exhibitor.save();
        res.json(exhibitor);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateExhibitor = updateExhibitor;
const removeExhibitor = async (req, res) => {
    try {
        const exhibitor = await Exhibitor_1.default.findById(req.params.eid);
        if (!exhibitor)
            return res.status(404).json({ message: "Exhibitor not found" });
        const event = await Event_1.default.findById(exhibitor.eventId);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        await Exhibitor_1.default.findByIdAndDelete(req.params.eid);
        res.json({ message: "Exhibitor removed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removeExhibitor = removeExhibitor;
