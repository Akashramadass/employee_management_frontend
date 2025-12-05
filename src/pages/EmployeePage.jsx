import React from "react";
import EmployeeList from "../components/EmployeeList";

export default function EmployeePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",       // centers horizontally
        paddingTop: "20px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "90%",                 // adjust how wide you want the content
          maxWidth: "1100px",           // prevents stretching too wide
        }}
      >
        <EmployeeList />
      </div>
    </div>
  );
}
