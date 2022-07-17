import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { uid } from "uid";
import { set, ref } from "firebase/database";
import { StudentHeader } from "../components/StudentHeader";
import firebase from "../firebase";
import Dashboard from "./Dashboard.css";
import { toast } from "react-toastify";

const StudentDashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const taskRef = firebase.database().ref("tasks");
    taskRef.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const switchDashboard = () => {
    try {
      setError("");
      navigate("/company-dashboard");
    } catch {
      setError("Failed to sign in");
    }
  };

  const onChange = () => {};
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const onSubmit = (id) => {
    if (window.confirm("Are you want to submit this task?")) {
      firebase.database().ref(`tasks/${id}`).remove();
    }
  };

  return (
    <>
      <StudentHeader />
      <div style={{ marginTop: "100px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Company</th>
              <th style={{ textAlign: "center" }}>Task</th>
              <th style={{ textAlign: "center" }}>Description</th>
              <th style={{ textAlign: "center" }}>Due Date</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].company}</td>
                  <td>{data[id].task}</td>
                  <td>{data[id].description}</td>
                  <td>{data[id].due_date}</td>
                  <td>
                    <div>
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFile"
                      ></label>
                    </div>

                    <button
                      className="btn btn-success"
                      onClick={() => {
                        toast.success("Submitted task successfully!");
                      }}
                    >
                      Submit
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      {/* <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={switchDashboard}>
          Go to company dashboard
        </Button>
      </div> */}
    </>
  );
};

export default StudentDashboard;
