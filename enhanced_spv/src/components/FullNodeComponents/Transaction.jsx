import React from "react";
import {
  Typography,
  Paper,
  Box,
  Avatar,
  Grid,
  Chip,
  useTheme,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TagIcon from "@mui/icons-material/Tag";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

const Transaction = ({ transaction, index }) => {
  const theme = useTheme();
  const isEven = index % 2 === 0;

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()[0];
  };

  // Get color based on name (consistent color for same name)
  const getColor = (name) => {
    const colors = [
      "#1976d2",
      "#388e3c",
      "#d32f2f",
      "#7b1fa2",
      "#c2185b",
      "#f57c00",
      "#0288d1",
      "#fbc02d",
    ];
    const sum = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 1,
        mb: 2,
        borderRadius: 2,
        bgcolor: isEven
          ? theme.palette.background.paper
          : theme.palette.grey[50],
        border: `1px solid ${
          isEven ? theme.palette.grey[200] : theme.palette.grey[300]
        }`,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Grid container spacing={2}>
        {/* Transaction header with ID and block info */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TagIcon
                sx={{
                  color: theme.palette.text.secondary,
                  mr: 1,
                  fontSize: 18,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                TX ID:{" "}
                <Typography
                  component="span"
                  variant="body2"
                  fontWeight="medium"
                  fontFamily="monospace"
                >
                  {transaction.txid}
                </Typography>
              </Typography>
            </Box>
            {transaction.block && (
              <Chip
                icon={<ViewModuleIcon fontSize="small" />}
                label={`Block #${transaction.blockNumber}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        </Grid>

        {/* User transfer section */}
        <Grid item xs={12} sm={8}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Sender */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: getColor(transaction.sender),
                  width: 36,
                  height: 36,
                  mr: 1,
                }}
              >
                {getInitials(transaction.sender)}
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={12}
                >
                  From
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {transaction.sender}
                </Typography>
              </Box>
            </Box>

            {/* Arrow */}
            <ArrowRightAltIcon
              sx={{
                mx: 2,
                color: theme.palette.primary.main,
                fontSize: 28,
              }}
            />

            {/* Receiver */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: getColor(transaction.receiver),
                  width: 36,
                  height: 36,
                  mr: 1,
                }}
              >
                {getInitials(transaction.receiver)}
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={12}
                >
                  To
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {transaction.receiver}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Amount and time */}
        <Box sx = {{ml : 2}}>
            <Grid item xs={12} sm={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "flex-end" },
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountBalanceWalletIcon
                sx={{ color: theme.palette.success.main, mr: 1 }}
              />
              <Typography variant="h6" color="success.main" fontWeight="bold">
                {transaction.amount.toFixed(2)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: { xs: 1, sm: 0 },
              }}
            >
              <CalendarTodayIcon
                sx={{
                  color: theme.palette.text.secondary,
                  mr: 1,
                  fontSize: 16,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {formatDate(transaction.timestamp)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        </Box>
      </Grid>
    </Paper>
  );
};

export default Transaction;

// Main component to display a list of transactions
