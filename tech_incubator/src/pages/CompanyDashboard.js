import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { uid } from "uid";
import { set, ref } from "firebase/database";
import { CompanyHeader } from "../components/CompanyHeader";
import firebase from "../firebase";

const CompanyDashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const switchDashboard = () => {
    try {
      setError("");
      navigate("/");
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
    <div>
      <CompanyHeader />
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={switchDashboard}>
          Go to student dashboard
        </Button>
      </div>
    </div>
  );
};

export default CompanyDashboard;
