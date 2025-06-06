import React, { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/JobSeekerSignup.css";

const JobSeekerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "job_seeker",
      });
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.detail || "Failed to create account.");
    }
  };  

  return (
    <div className="signup-container">
      <h2>Job Seeker Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default JobSeekerSignup;
