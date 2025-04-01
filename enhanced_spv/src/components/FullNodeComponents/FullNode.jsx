import React, { useState } from "react";
import { Typography, Button, Box, Paper, useTheme } from "@mui/material";
import FullNodeLogs from "./FullNodeLogs";
import { useNavigate } from "react-router-dom";
function FullNode() {
  const [selectedBlockchain, setSelectedBlockchain] = useState(
    "Without CA Blockchain"
  );
  const theme = useTheme();
  const navigate = useNavigate();


  const handleLogout = () => {
    navigate("/"); // Redirect to Home
  }
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Paper
        elevation={3}
        sx={{
          width: 250,
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 10,
          borderRadius: 0,
          boxShadow: theme.shadows[3],
        }}
      >
        <Box sx={{ p: 3}}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Blockchain Types
          </Typography>

          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant={
                selectedBlockchain === "Without CA Blockchain"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setSelectedBlockchain("Without CA Blockchain")}
              sx={{ justifyContent: "flex-start", textAlign: "left", py: 1 }}
            >
              Without CA Blockchain
            </Button>

            <Button
              fullWidth
              variant={
                selectedBlockchain === "With Bloom Filter Blockchain"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                setSelectedBlockchain("With Bloom Filter Blockchain")
              }
              sx={{ justifyContent: "flex-start", textAlign: "left", py: 1 }}
            >
              With Bloom Filter Blockchain
            </Button>

            <Button
              fullWidth
              variant={
                selectedBlockchain === "With Cuckoo Filter Blockchain"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                setSelectedBlockchain("With Cuckoo Filter Blockchain")
              }
              sx={{ justifyContent: "flex-start", textAlign: "left", py: 1 }}
            >
              With Cuckoo Filter Blockchain
            </Button>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center" p={2} >
            <Button variant="contained" color="primary" onClick={() => handleLogout()}>
              Logout
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Main Content - FullNodeLogs component handles its own layout */}
      <FullNodeLogs selectedBlockchain={selectedBlockchain} />
    </Box>
  );
}

export default FullNode;
