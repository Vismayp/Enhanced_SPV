import React, { useState, useEffect } from "react";
import { Paper, Box, Button, useTheme } from "@mui/material";
import axios from "axios";
import TransactionList from "./TransactionList"; // Assuming you have a TransactionList component
import CurrencyTransfer from "./CurrencyTransfer";
import config from "../../config";

function LightClientManager({ selectedMode, name }) {
  const [transactions, setTransactions] = useState([]);
  const [clientNames, setClientNames] = useState([]);
  const [activeTab, setActiveTab] = useState("completed");
  const theme = useTheme();
  const baseUrl = config.API_BASE_URL;

  const getEndpoint = () => {
    switch (selectedMode) {
      case "light Client":
        return "/lightclient";
      case "light Client - Bloom":
        return "/lightclientbloom";
      case "light Client - Cuckoo":
      default:
        return "/lightclientcuckoo";
    }
  };

  const test = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/lightclient/completedTransactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "Archie Marquardt" }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on first load and when tab changes
  useEffect(() => {
    if (activeTab === "completed") {
      fetchCompletedTransactions();
    } else {
      fetchClientLists();
    }
  }, [activeTab, selectedMode]);

  const fetchCompletedTransactions = async () => {
    // await test();
    try {
      const endpoint = getEndpoint();
      const txs = "/completedTransactions";
      const response = await axios.post(`${baseUrl}${endpoint}${txs}`, {
        name: name,
      });

      // console.log(response.data);
      setTransactions(response.data.transactions.transactions);
    } catch (error) {
      console.error("Error fetching completed transactions:", error);
      setTransactions([]);
    }
  };

  const fetchClientLists = async () => {
    try {
      const endpoint = getEndpoint();
      const response = await axios.get(`${baseUrl}${endpoint}/clientNames`);
      setClientNames(response.data.clients);
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
              My Transactions
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
              Transfer Currency
            </Button>
          </Box>
        </Box>
        {/* Transaction Data */}
        {activeTab === "completed" && (
          <TransactionList transactions={transactions} name={name} selectedMode={selectedMode}/>
        )}
        {activeTab === "pooled" && (
          <CurrencyTransfer
            name={name}
            selectedMode={selectedMode}
            clients={clientNames}
          />
        )}
      </Paper>
    </Box>
  );
}

export default LightClientManager;
