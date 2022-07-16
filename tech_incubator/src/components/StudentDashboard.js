import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { uid } from "uid";
import { set } from "firebase/database";

const StudentDashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  //write

  //read

  //update

  //delete

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Task List</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <input type="text" />
          <button>submit</button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default StudentDashboard;
