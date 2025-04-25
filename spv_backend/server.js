import express from "express";
import cors from "cors";
import { generateBlockahin } from './FullnodeAndClientManager.js';
import fullNodeRoutes from "./routes/fullNodeRoutes.js";
import lightClientRoutes from "./routes/lightClientRoutes.js";
import fullNodeBloomRoutes from "./routes/fullNodeBloomRoutes.js";
import lightClientBloomRoutes from "./routes/lightClientBloomRoutes.js";
import lightClientCuckooRoutes from "./routes/lightClientCuckooRoutes.js";
import fullNodeCuckooRoutes from "./routes/fullNodeCuckooRoutes.js";

const app = express();
app.use(express.json());

// Determine if we're in development mode
const isDevelopment = process.env.NODE_ENV !== 'production';

// List of allowed origins for production
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
    "https://enhancedspv-production.up.railway.app",
    "https://railway.com"
].filter(Boolean); // Remove any undefined/null values

// Updated CORS configuration with dynamic origin handling
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        
        // Allow all origins in development
        if (isDevelopment) return callback(null, true);
        
        // Check if the origin is allowed in production
        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.some(allowed => origin.endsWith(allowed))) {
            return callback(null, true);
        } else {
            console.log(`CORS blocked request from: ${origin}`);
            return callback(null, true); // Temporarily allow all to debug
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Register routes
app.use("/fullnode", fullNodeRoutes);
app.use("/lightclient", lightClientRoutes);
app.use("/fullnodebloom", fullNodeBloomRoutes);
app.use("/lightclientbloom", lightClientBloomRoutes);
app.use("/lightclientcuckoo", lightClientCuckooRoutes);
app.use("/fullnodecuckoo", fullNodeCuckooRoutes);

// Simple CORS preflight check endpoint
app.options('*', cors());

app.get("/", (req, res) => {
    res.send("Blockchain simulation running...");
});

// Debug endpoint to check CORS
app.get("/cors-test", (req, res) => {
    res.json({
        message: "CORS test successful",
        allowedOrigins,
        requestOrigin: req.headers.origin || 'No origin header'
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    generateBlockahin();
    console.log(`Server running on port ${PORT}`);
    console.log(`Allowed origins: ${JSON.stringify(allowedOrigins)}`);
});
