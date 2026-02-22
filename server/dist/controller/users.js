"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select("-password");
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // Check if admin or self
        if (req.user?.role !== "admin" && req.user?._id.toString() !== req.params.id) {
            return res.status(403).json({ message: "Access denied" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        // Check if admin or self
        if (req.user?.role !== "admin" && req.user?._id.toString() !== req.params.id) {
            return res.status(403).json({ message: "Access denied" });
        }
        const user = await User_1.default.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        user.name = name || user.name;
        user.email = email || user.email;
        if (req.user?.role === "admin" && role) {
            user.role = role;
        }
        await user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteUser = deleteUser;
