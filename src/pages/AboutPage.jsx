import React from "react";
import { Paper, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        About This Project
      </Typography>
      <Typography>
        This Employee Management System is built with React, 
        Vite, Material-UI, Spring Boot, and MySQL. 
        It demonstrates CRUD operations, API integration, 
        and professional UI design.
      </Typography>
    </Paper>
  );
}
