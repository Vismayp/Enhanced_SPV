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
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3003");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


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

const PORT = 8080;
app.listen(PORT, () => {
    generateBlockahin();
    console.log(`Server running on http://localhost:${PORT}`);
});
