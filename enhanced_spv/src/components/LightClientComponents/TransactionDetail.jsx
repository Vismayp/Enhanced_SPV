import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  IconButton,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import config from "../../config";

const TransactionDetail = ({ transaction, selectedMode, onBack }) => {
  const [merkleProof, setMerkleProof] = useState(null);
  const [display, setDisplay] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

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

  const handleGetMerkleProof = async () => {
    try {
      const endpoint = getEndpoint();
      const response = await fetch(`${baseUrl}${endpoint}/getMerkleProof`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txid: transaction.txid,
          blockNumber: transaction.blockNumber,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setDisplay(true);
      }
      setMerkleProof(data);
    } catch (error) {
      console.error("Error fetching Merkle Proof:", error);
    }
  };

  const handleVerifyMerkleProof = async () => {
    try {
      console.log(`${baseUrl}${getEndpoint()}/verifyMerkleProof`);
      const response = await fetch(
        `${baseUrl}${getEndpoint()}/verifyMerkleProof`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rootHash: merkleProof.rootHash,
            transactionHash: merkleProof.transactionHash,
            proof: merkleProof.proof,
          }),
        }
      );

      const data = await response.json();
      if (data.isValid) {
        setVerificationResult("Merkle proof verified successfully!");
      } else {
        setVerificationResult("Merkle proof verification failed.");
      }
    } catch (error) {
      console.error("Error verifying Merkle Proof:", error);
      setVerificationResult("An error occurred during verification.");
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{ padding: 3, width: "100%", position: "relative" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          top: 10,
          left: 10,
          right: 10,
        }}
      >
        {/* Back Button */}
        <IconButton onClick={onBack}>
          <ArrowBack />
        </IconButton>
        {verificationResult && (
          <Card
            sx={{
              backgroundColor: verificationResult.includes("successfully")
                ? "#4caf50"
                : "#f44336",
              color: "white",
              flex: 1,
              marginLeft: 2,
              marginRight: 2,
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6">{verificationResult}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          width: "100%",
          mt: 5, // Add some margin top to account for back button
        }}
      >
        {/* Left Side - Transaction Details */}
        <Box
          sx={{
            flex: 1,
            width: { xs: "100%", md: "50%" },
            minWidth: { xs: "100%", md: "300px" },
          }}
        >
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Transaction Details
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Transaction ID:</strong> {transaction.txid}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Block Number:</strong> {transaction.blockNumber}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Sender:</strong> {transaction.sender}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Receiver:</strong> {transaction.receiver}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Amount:</strong> {transaction.amount.toFixed(2)}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <strong>Time:</strong>{" "}
              {new Date(transaction.timestamp).toLocaleString()}
            </Typography>

            {/* Provide Merkle Proof Button */}
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGetMerkleProof}
                fullWidth
              >
                Provide Merkle Proof
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Right Side - Merkle Proof and Verification */}
        <Box
          sx={{
            flex: 1,
            width: { xs: "100%", md: "50%" },
            minWidth: { xs: "100%", md: "300px" },
            display: merkleProof ? "block" : "none", // Only display when merkleProof exists
          }}
        >
          {merkleProof && (
            <Paper
              sx={{
                padding: 3,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                marginBottom: 2,
                height: "100%",
              }}
            >
              <Box
                sx={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  backgroundColor: "#e0e0e0",
                  p: 2,
                  borderRadius: 1,
                  mb: 3,
                }}
              >
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    margin: 0,
                  }}
                >
                  {JSON.stringify(merkleProof, null, 2)}
                </pre>
              </Box>

              {display && (
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleVerifyMerkleProof}
                    fullWidth
                  >
                    Verify Merkle Proof
                  </Button>
                </Box>
              )}

              {/* Verification Success Message */}
            </Paper>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default TransactionDetail;
