import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import TransactionDetail from "./TransactionDetail";

const TransactionsList = ({ transactions, name, selectedMode }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };



  const handleRowClick = (txn) => {
    setSelectedTransaction(txn);
  };

  if (selectedTransaction) {
    return (
      <TransactionDetail
        transaction={selectedTransaction}
        selectedMode={selectedMode}
        onBack={() => setSelectedTransaction(null)}
      />
    );
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
  });

  const dummyTransaction = {
    txid: 373838549630409,
    blockNumber: 3,
    sender: "Archie Marquardt",
    receiver: "Ekank Chhaparwal",
    amount: 100,
    timestamp: new Date("2025-04-01T12:20:15").getTime(),
  };

  const transactionsWithDummy = [...transactions, dummyTransaction];

  const filteredTransactions = transactionsWithDummy
    .sort((a, b) => {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    })
    .filter(
      (txn) =>
        txn.receiver.toLowerCase().includes(search.toLowerCase()) ||
        txn.sender.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <Paper sx={{ padding: 2, width: "100%", overflowX: "auto" }}>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Transaction ID</strong>
              </TableCell>
              <TableCell>
                <strong>Block No.</strong>
              </TableCell>
              <TableCell>
                <strong>Sender</strong>
              </TableCell>
              <TableCell>
                <strong>Receiver</strong>
              </TableCell>
              <TableCell>
                <strong>Amount</strong>
                <IconButton onClick={handleSort}>
                  {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
              </TableCell>
              <TableCell>
                <strong>Time</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((txn) => (
              <TableRow
                key={txn.txid}
                sx={{
                  backgroundColor:
                    txn.sender.toLowerCase() === name.toLowerCase()
                      ? "lightcoral"
                      : "lightgreen",
                  cursor: "pointer",
                }}
                onClick={() => handleRowClick(txn)}
              >
                <TableCell>{txn.txid}</TableCell>
                <TableCell>{txn.blockNumber}</TableCell>
                <TableCell>{txn.sender}</TableCell>
                <TableCell>{txn.receiver}</TableCell>
                <TableCell>{txn.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(txn.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TransactionsList;
