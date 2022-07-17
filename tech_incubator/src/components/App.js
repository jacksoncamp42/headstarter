import Signup from "./Signup";
import { Container } from "react-bootstrap";
import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from "../pages/StudentDashboard";
import CompanyDashboard from "../pages/CompanyDashboard";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import AddEdit from "../pages/AddEdit";
import View from "../pages/View";
import About from "../pages/About";
import Search from "../pages/Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <Container>
        <div>
          <Router>
            <AuthProvider>
              <ToastContainer position="top-center" />
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
                <Route path="/add" element={<AddEdit />} />
                <Route path="/update/:id" element={<AddEdit />} />
                <Route path="/view/:id" element={<View />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
};

export default App;
