import express from "express";
import { generateBlockahin } from './FullnodeAndClientManager.js';
import fullNodeRoutes from "./routes/fullNodeRoutes.js";
import lightClientRoutes from "./routes/lightClientRoutes.js";
import fullNodeBloomRoutes from "./routes/fullNodeBloomRoutes.js";
import lightClientBloomRoutes from "./routes/lightClientBloomRoutes.js";
import lightClientCuckooRoutes from "./routes/lightClientCuckooRoutes.js";
import fullNodeCuckooRoutes from "./routes/fullNodeCuckooRoutes.js";

const app = express();
app.use(express.json());

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
