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

// Updated CORS configuration to allow requests from the deployed frontend
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || "http://localhost:3000",
        "https://enhancedspv-production.up.railway.app",
        "https://railway.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// Register routes
app.use("/fullnode", fullNodeRoutes);
app.use("/lightclient", lightClientRoutes);
app.use("/fullnodebloom", fullNodeBloomRoutes);
app.use("/lightclientbloom", lightClientBloomRoutes);
app.use("/lightclientcuckoo", lightClientCuckooRoutes);
app.use("/fullnodecuckoo", fullNodeCuckooRoutes);

app.get("/", (req, res) => {
    res.send("Blockchain simulation running...");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    generateBlockahin();
    console.log(`Server running on port ${PORT}`);
});
