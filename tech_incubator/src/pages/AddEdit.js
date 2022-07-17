import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import firebase from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  company: "",
  task: "",
  description: "",
  due_date: "",
};

export const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { company, task, description, due_date } = state;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("e");
    e.preventDefault();
    if (!company || !task || !description || !due_date) {
      toast.error("Please provide value in each input field");
    } else {
      const taskRef = firebase.database().ref("tasks");
      taskRef.push(state);
      toast.success("Task added successfully");

      setTimeout(() => navigate("/"), 2000);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Insert company"
          value={company}
          onChange={handleInputChange}
        />

        <label htmlFor="task">Task</label>
        <input
          type="text"
          id="task"
          name="task"
          placeholder="Insert task"
          value={task}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Insert description"
          value={description}
          onChange={handleInputChange}
        />

        <label htmlFor="due_date">Due date</label>
        <input
          type="text"
          id="due_date"
          name="due_date"
          placeholder="Insert due date"
          value={due_date}
          onChange={handleInputChange}
        />

        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddEdit;
