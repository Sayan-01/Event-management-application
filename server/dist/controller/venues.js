"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVenue = exports.updateVenue = exports.createVenue = exports.getVenues = void 0;
const Venue_1 = __importDefault(require("../models/Venue"));
const getVenues = async (req, res) => {
    try {
        const venues = await Venue_1.default.find();
        res.json(venues);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getVenues = getVenues;
const createVenue = async (req, res) => {
    try {
        const venue = new Venue_1.default(req.body);
        await venue.save();
        res.status(201).json(venue);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createVenue = createVenue;
const updateVenue = async (req, res) => {
    try {
        const venue = await Venue_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!venue)
            return res.status(404).json({ message: "Venue not found" });
        res.json(venue);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateVenue = updateVenue;
const deleteVenue = async (req, res) => {
    try {
        const venue = await Venue_1.default.findByIdAndDelete(req.params.id);
        if (!venue)
            return res.status(404).json({ message: "Venue not found" });
        res.json({ message: "Venue deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteVenue = deleteVenue;
