import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Payment } from "@mui/icons-material";
import config from "../../config";

const CurrencyTransfer = ({ name, selectedMode, clients }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

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

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAmount("");
  };

  const handlePayment = async () => {
    try {
      const endpoint = `${baseUrl}${getEndpoint()}/transferCurrency`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: name,
          receiver: selectedClient,
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setConfirmationOpen(true);
    } catch (error) {
      console.error("Payment failed:", error);
    }

    handleClose();
  };

  return (
    <Box
      sx={{ maxWidth: 400, margin: "auto", textAlign: "center", padding: 2, overflow: "auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Select a Client
      </Typography>
      <List>
        {clients.map((client, index) => (
          <ListItem
            key={index}
            button
            onClick={() => handleSelectClient(client)}
          >
            <ListItemText primary={client} />
            <Payment color="primary" />
          </ListItem>
        ))}
      </List>

      {/* Payment Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transfer Money to {selectedClient}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="number"
            label="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePayment} color="primary" variant="contained">
            Pay
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Popup */}
      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
      >
        <DialogTitle>Payment Successful</DialogTitle>
        <DialogContent>
          <Typography>Transaction completed for {selectedClient}!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CurrencyTransfer;
