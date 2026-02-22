"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelRegistration = exports.getUserTickets = exports.getAttendeesByEvent = exports.registerForEvent = void 0;
const Registration_1 = __importDefault(require("../models/Registration"));
const Event_1 = __importDefault(require("../models/Event"));
const registerForEvent = async (req, res) => {
    try {
        const event = await Event_1.default.findById(req.params.id);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.status !== "published") {
            return res.status(400).json({ message: "Registration is only allowed for published events" });
        }
        // Check capacity
        const currentAttendees = await Registration_1.default.countDocuments({ eventId: req.params.id, status: "active" });
        if (currentAttendees >= event.maxCapacity) {
            return res.status(400).json({ message: "Event is at full capacity" });
        }
        // Check if already registered
        const existingRegistration = await Registration_1.default.findOne({
            eventId: req.params.id,
            userId: req.user?._id,
            status: "active",
        });
        if (existingRegistration) {
            return res.status(400).json({ message: "You are already registered for this event" });
        }
        const { ticketType } = req.body;
        const registration = new Registration_1.default({
            userId: req.user?._id,
            eventId: req.params.id,
            ticketType: ticketType || "general",
            amountPaid: event.ticketPrice, // Simplification for now
        });
        await registration.save();
        res.status(201).json(registration);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.registerForEvent = registerForEvent;
const getAttendeesByEvent = async (req, res) => {
    try {
        const event = await Event_1.default.findById(req.params.id);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const attendees = await Registration_1.default.find({ eventId: req.params.id }).populate("userId", "name email");
        res.json(attendees);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAttendeesByEvent = getAttendeesByEvent;
const getUserTickets = async (req, res) => {
    try {
        if (req.params.id !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const tickets = await Registration_1.default.find({ userId: req.params.id }).populate("eventId");
        res.json(tickets);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUserTickets = getUserTickets;
const cancelRegistration = async (req, res) => {
    try {
        const registration = await Registration_1.default.findById(req.params.id);
        if (!registration)
            return res.status(404).json({ message: "Registration not found" });
        if (registration.userId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        registration.status = "cancelled";
        await registration.save();
        res.json({ message: "Registration cancelled successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.cancelRegistration = cancelRegistration;
