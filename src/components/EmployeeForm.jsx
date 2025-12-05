import React, { useEffect, useState } from "react";
import { createEmployee, updateEmployee } from "../api/EmployeeService";
import { TextField, Button, Paper, Stack } from "@mui/material";

export default function EmployeeForm({ editing, onSaved }) {
  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    salary: ""
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm(emptyForm);
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, salary: parseFloat(form.salary) || 0 };
    editing ? updateEmployee(editing.id, payload).then(onSaved)
            : createEmployee(payload).then(onSaved);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        marginBottom: 3,
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>

        <Stack spacing={3} sx={{ width: "100%" }}>
          
          <TextField
            fullWidth
            label="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />

          <TextField
            fullWidth
            label="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: "150px" }}
          >
            {editing ? "Update" : "Add"}
          </Button>

        </Stack>

      </form>
    </Paper>
  );
}
