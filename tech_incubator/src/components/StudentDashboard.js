import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { uid } from "uid";
import { set, ref } from "firebase/database";

const StudentDashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const switchDashboard = () => {
    try {
      setError("");
      navigate("/company-dashboard");
    } catch {
      setError("Failed to sign in");
    }
  };
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Student Dashboard</h2>
          <h2 className="text-center mb-4">Task List</h2>
          {error && <Alert variant="danger">{error}</Alert>}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={switchDashboard}>
          Go to company dashboard
        </Button>
      </div>
    </>
  );
};

export default StudentDashboard;
