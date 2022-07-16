import Signup from "./Signup";
import { Container } from "react-bootstrap";
import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import CompanyDashboard from "./CompanyDashboard";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";

const App = () => {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <PrivateRoute>
                      <StudentDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="/company-dashboard"
                  element={
                    <PrivateRoute>
                      <CompanyDashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
};

export default App;
