import React, { useEffect, useState } from "react";
import { getAllEmployees, deleteEmployee } from "../api/EmployeeService";
import EmployeeForm from "./EmployeeForm";

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Stack, Typography, TextField,
  Pagination, Snackbar, Alert
} from "@mui/material";

export default function EmployeeList() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Toast notification
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  const loadEmployees = () => {
    getAllEmployees().then((res) => setEmployees(res.data));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // If search changes → reset to page 1
  useEffect(() => {
    setPage(1);
  }, [search]);

  const removeEmployee = (id) => {
    if (window.confirm("Delete employee?")) {
      deleteEmployee(id).then(() => {
        loadEmployees();
        showToast("Employee deleted!", "success");
      });
    }
  };

  // Filter employees by search
  const filteredEmployees = employees.filter((emp) => {
    const v = search.toLowerCase();
    return (
      emp.firstName.toLowerCase().includes(v) ||
      emp.lastName.toLowerCase().includes(v) ||
      emp.email.toLowerCase().includes(v) ||
      emp.department.toLowerCase().includes(v)
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        padding: "0 5px",
        boxSizing: "border-box",
        overflowX: "hidden"
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "600",
          color: "#050505ff"
        }}
      >
        Add New Employee
      </Typography>

      {/* Form */}
      <EmployeeForm
        editing={editing}
        onSaved={() => {
          setEditing(null);
          loadEmployees();
          showToast(editing ? "Employee updated!" : "Employee added!");
        }}
      />

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search employees..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ width: "100%", overflowX: "auto", boxSizing: "border-box" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedEmployees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.id}</TableCell>
                <TableCell>{emp.firstName} {emp.lastName}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.salary}</TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={() => setEditing(emp)}>
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeEmployee(emp.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      />

      {/* Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={toastType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>

    </div>
  );
}
