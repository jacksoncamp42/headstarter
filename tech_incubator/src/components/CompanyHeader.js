import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import "react-toastify/dist/ReactToastify.css";

export const CompanyHeader = () => {
  const [activeTab, setActiveTab] = useState("Company's Tasks");
  const handleSubmit = () => {};
  return (
    <div className="header">
      <p className="logo">Company Dashboard</p>
      <div className="header-right">
        <Link to="/company-dashboard">
          <p
            className={`${activeTab === "Company's Tasks" ? "active" : ""}`}
            onClick={() => setActiveTab("Company's Tasks")}
          >
            Company's Tasks
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === "Add Task" ? "active" : ""}`}
            onClick={() => setActiveTab("Add Task")}
          >
            Add Task
          </p>
        </Link>
      </div>
    </div>
  );
};
