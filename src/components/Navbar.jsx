import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ padding: "0 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left side title */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Employee Management
        </Typography>

        {/* Right side buttons */}
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Stack>

      </Toolbar>
    </AppBar>
  );
}
