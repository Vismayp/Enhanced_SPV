import React, { useState } from "react";
import { Typography, Button, Box, Paper, useTheme } from "@mui/material";
import LightClientManager from "./LightClientManager";
import { useNavigate } from "react-router-dom";

function LightClient() {
  const [selectedMode, setSelectedMode] = useState("light Client");
  const theme = useTheme();
  const username = "Archie Marquardt"; // Placeholder for username
  const navigate = useNavigate();

  const handleLogout = () => {
        // Perform logout logic here (e.g., clear authentication state)
        navigate("/"); // Redirect to Home
    };


  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#e3f2fd",
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
          boxShadow: theme.shadows[4],
          bgcolor: "#bbdefb", // Different sidebar color
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Light Client Modes
            </Typography>

            <Box
              sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Button
                fullWidth
                variant={
                  selectedMode === "light Client" ? "contained" : "outlined"
                }
                onClick={() => setSelectedMode("light Client")}
                sx={{ justifyContent: "flex-start", textAlign: "left", py: 1 }}
              >
                Basic Mode
              </Button>

              <Button
                fullWidth
                variant={
                  selectedMode === "light Client - Bloom"
                    ? "contained"
                    : "outlined"
                }
                onClick={() => setSelectedMode("light Client - Bloom")}
                sx={{ justifyContent: "flex-start", textAlign: "left", py: 1 }}
              >
                Bloom Mode
              </Button>

              <Button
                fullWidth
                variant={
                  selectedMode === "light Client - Cuckoo"
                    ? "contained"
                    : "outlined"
                }
                onClick={() => setSelectedMode("light Client - Cuckoo")}
                sx={{ justifyContent: "flex-start", textAlign: "left", py: 1 }}
              >
                Cuckoo Mode
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                bgcolor: "#1e88e5",
                color: "#fff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 28,
              }}
            >
              {username[0]}
            </Box>
            <Typography variant="h6" fontWeight="medium" mt={1}>
              {username}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Main Content - LightClientLogs component handles its own layout */}
      <LightClientManager selectedMode={selectedMode} name={username} />
    </Box>
  );
}

export default LightClient;
