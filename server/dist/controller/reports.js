"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevenueStats = exports.getRegistrationStats = exports.getEventStats = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const Registration_1 = __importDefault(require("../models/Registration"));
const getEventStats = async (req, res) => {
    try {
        const totalEvents = await Event_1.default.countDocuments();
        const publishedEvents = await Event_1.default.countDocuments({ status: "published" });
        const draftEvents = await Event_1.default.countDocuments({ status: "draft" });
        res.json({
            totalEvents,
            publishedEvents,
            draftEvents,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getEventStats = getEventStats;
const getRegistrationStats = async (req, res) => {
    try {
        const stats = await Registration_1.default.aggregate([
            {
                $group: {
                    _id: "$eventId",
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "events",
                    localField: "_id",
                    foreignField: "_id",
                    as: "event",
                },
            },
            {
                $unwind: "$event",
            },
            {
                $project: {
                    eventTitle: "$event.title",
                    registrationCount: "$count",
                },
            },
        ]);
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRegistrationStats = getRegistrationStats;
const getRevenueStats = async (req, res) => {
    try {
        const stats = await Registration_1.default.aggregate([
            {
                $match: { status: "active" },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amountPaid" },
                },
            },
        ]);
        res.json(stats[0] || { totalRevenue: 0 });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRevenueStats = getRevenueStats;
