"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
// Connect to MongoDB
(0, db_1.connectDB)();
// Basic route
app.get("/", (req, res) => {
    res.send("Event Management System API");
});
// Import routes
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const events_route_1 = __importDefault(require("./routes/events.route"));
const venues_route_1 = __importDefault(require("./routes/venues.route"));
const reports_route_1 = __importDefault(require("./routes/reports.route"));
const registrations_route_1 = __importDefault(require("./routes/registrations.route"));
// Use routes
app.use("/api/auth", auth_route_1.default);
app.use("/api/users", users_route_1.default);
app.use("/api/events", events_route_1.default);
app.use("/api/venues", venues_route_1.default);
app.use("/api/reports", reports_route_1.default);
app.use("/api/registrations", registrations_route_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
