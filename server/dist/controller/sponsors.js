"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSponsorAssets = exports.removeSponsor = exports.updateSponsor = exports.addSponsorshipPackage = exports.getSponsorsByEvent = void 0;
const Sponsor_1 = __importDefault(require("../models/Sponsor"));
const Event_1 = __importDefault(require("../models/Event"));
const getSponsorsByEvent = async (req, res) => {
    try {
        const sponsors = await Sponsor_1.default.find({ eventId: req.params.id, status: "active" });
        res.json(sponsors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSponsorsByEvent = getSponsorsByEvent;
const addSponsorshipPackage = async (req, res) => {
    try {
        const event = await Event_1.default.findById(req.params.id);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const sponsor = new Sponsor_1.default({ ...req.body, eventId: req.params.id });
        await sponsor.save();
        res.status(201).json(sponsor);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addSponsorshipPackage = addSponsorshipPackage;
const updateSponsor = async (req, res) => {
    try {
        const sponsor = await Sponsor_1.default.findById(req.params.sid);
        if (!sponsor)
            return res.status(404).json({ message: "Sponsor not found" });
        const event = await Event_1.default.findById(sponsor.eventId);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        Object.assign(sponsor, req.body);
        await sponsor.save();
        res.json(sponsor);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateSponsor = updateSponsor;
const removeSponsor = async (req, res) => {
    try {
        const sponsor = await Sponsor_1.default.findById(req.params.sid);
        if (!sponsor)
            return res.status(404).json({ message: "Sponsor not found" });
        const event = await Event_1.default.findById(sponsor.eventId);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        if (event.organizerId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        await Sponsor_1.default.findByIdAndDelete(req.params.sid);
        res.json({ message: "Sponsor removed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removeSponsor = removeSponsor;
const uploadSponsorAssets = async (req, res) => {
    try {
        const sponsor = await Sponsor_1.default.findById(req.params.sid);
        if (!sponsor)
            return res.status(404).json({ message: "Sponsor not found" });
        if (sponsor.userId.toString() !== req.user?._id.toString() && req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const { logoUrl, promotionalMaterials } = req.body;
        sponsor.logoUrl = logoUrl || sponsor.logoUrl;
        // Assuming benefits or a new field for promo materials
        await sponsor.save();
        res.json(sponsor);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.uploadSponsorAssets = uploadSponsorAssets;
