import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeePage from "./pages/EmployeePage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <Router>
      
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Navbar />

        <div
          style={{
            minHeight: "100vh",
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#f0f2f5",
          }}
        >
          <div style={{ width: "95%" }}>
            <Routes>
              <Route path="/" element={<EmployeePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
