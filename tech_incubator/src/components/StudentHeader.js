import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import "react-toastify/dist/ReactToastify.css";

export const StudentHeader = () => {
  const [activeTab, setActiveTab] = useState("Task List");

  const handleSubmit = () => {};
  return (
    <div className="header">
      <p className="logo">Student Dashboard</p>
      <div className="header-right">
        <Link to="/">
          <p
            className={`${activeTab === "Task List" ? "active" : ""}`}
            onClick={() => setActiveTab("Task List")}
          >
            Task List
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
