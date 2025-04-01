import React, { useState, useEffect } from "react";
import { Paper, Box, Button, useTheme } from "@mui/material";
import axios from "axios";
import TransactionList from "./TransactionList";

function FullNodeLogs({ selectedBlockchain }) {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("completed");
  const theme = useTheme();
  const baseUrl = "http://localhost:8080";

  const getEndpoint = () => {
    switch (selectedBlockchain) {
      case "With Bloom Filter Blockchain":
        return "/fullnodebloom";
      case "With Cuckoo Filter Blockchain":
        return "/fullnodecuckoo";
      case "Without CA Blockchain":
      default:
        return "/fullnode";
    }
  };

  // Fetch data on first load and when tab changes
  useEffect(() => {
    if (activeTab === "completed") {
      fetchCompletedTransactions();
    } else {
      fetchPooledTransactions();
    }
  }, [activeTab, selectedBlockchain]);

  const fetchCompletedTransactions = async () => {
    try {
      const endpoint = getEndpoint();
      const response = await axios.get(`${baseUrl}${endpoint}`);
      setTransactions(response.data.transactions.reverse());
    } catch (error) {
      console.error("Error fetching completed transactions:", error);
      setTransactions([]);
    }
  };

  const fetchPooledTransactions = async () => {
    try {
      const endpoint = getEndpoint();
      const response = await axios.get(
        `${baseUrl}${endpoint}/pooledTransactions`
      );
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching pooled transactions:", error);
      setTransactions([]);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        ml: "250px", // Match the sidebar width
        p: 1,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          height: "calc(100vh - 48px)", // Account for padding
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Tab header */}
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              maxWidth: 500,
              mx: "auto",
              bgcolor: theme.palette.background.paper,
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Button
              color="primary"
              variant={activeTab === "completed" ? "contained" : "text"}
              onClick={() => handleTabChange("completed")}
              sx={{
                flex: 1,
                py: 1,
                borderRadius: 1,
                boxShadow: 0,
                m: 0.5,
              }}
            >
              Completed Transactions
            </Button>
            <Button
              color="primary"
              variant={activeTab === "pooled" ? "contained" : "text"}
              onClick={() => handleTabChange("pooled")}
              sx={{
                flex: 1,
                py: 1,
                borderRadius: 1,
                boxShadow: 0,
                m: 0.5,
              }}
            >
              Pooled Transactions
            </Button>
            
          </Box>
        </Box>

        {/* Transaction Data */}
        <TransactionList transactions={transactions} />

        {/* Add New Block Button */}
        {activeTab === "pooled" && transactions.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                try {
                  const endpoint = getEndpoint();
                  await axios.post(`${baseUrl}${endpoint}/addBlock`);
                  fetchPooledTransactions(); // Refresh pooled transactions after adding a block
                } catch (error) {
                  console.error("Error adding new block:", error);
                }
              }}
            >
              Add New Block
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default FullNodeLogs;
