import React from "react";
import { Typography, Box } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import TransactionCard from "./Transaction"; // Assuming TransactionCard is in the same directory

const TransactionList = ({ transactions = [] }) => {
  return (
    <Box sx={{ p: 2, overflowY: "auto" }}>
      {transactions.length > 0 ? (
        transactions.map((tx, index) => (
          <TransactionCard key={index} transaction={tx} index={index} />
        ))
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 4,
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
          }}
        >
          <InboxIcon sx={{ fontSize: 120, color: "text.secondary", mb: 1 }} />
          <Typography color="text.secondary">
            No transactions available.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TransactionList;
