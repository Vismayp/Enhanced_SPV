import React, { useState } from "react";
import { Container, Typography, Button, TextField, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LightClient from "./LightClientComponents/LightClient";
import FullNode from "./FullNodeComponents/FullNode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => {
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClientLogin = () => {
    if (username === "lightclient" && password === "123") {
      navigate("/light-client");
    } else {
      setMessage("Invalid username or password");
    }
  };

  const handleAdminLogin = () => {
    if (username === "fullnode" && password === "123") {
      navigate("/full-node");
    } else {
      setMessage("Invalid username or password");
    }
  };

  return (
    <Container
      sx={{ 
        textAlign: "center", 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#f5f5f5",
        padding: 4
      }}
    >
      <Typography variant="h4" gutterBottom>
        Enhanced Simple Payment Verification
      </Typography>
      <Paper sx={{ padding: 3, display: "flex", gap: 2, mt: 3, justifyContent: "center" }}>
        <Button variant="contained" onClick={() => setUserType("Client")}>Client Login</Button>
        <Button variant="contained" color="secondary" onClick={() => setUserType("Admin")}>Admin Login</Button>
      </Paper>
      {userType && (
        <Paper sx={{ padding: 3, mt: 3, width: "300px" }}>
          <Typography variant="h6" gutterBottom>{userType} Login</Typography>
          <TextField fullWidth label="Username" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ mt: 2 }} 
            onClick={userType === "Client" ? handleClientLogin : handleAdminLogin}>
            Login
          </Button>
          {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
        </Paper>
      )}
    </Container>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/light-client" element={<LightClient />} />
        <Route path="/full-node" element={<FullNode />} />
      </Routes>
    </Router>
  );
}

export default App;
