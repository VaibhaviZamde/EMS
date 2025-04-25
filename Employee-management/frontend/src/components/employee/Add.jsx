import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    image: null,
  });
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const url = "https://ems-backend-uc0w.onrender.com";

  // Fetch departments on mount
  useEffect(() => {
    axios
      .get(url+"/api/department", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.success) setDepartments(res.data.departments);
        else setError(res.data.error || "Failed to load departments");
      })
      .catch((err) => setError(err.response?.data?.error || err.message));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Build FormData and log it
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      payload.append(key, val);
      console.log("FormData append:", key, val);
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/employee/add",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        alert("Employee added successfully!");
        navigate("/admin-dashboard/employees")
      } else {
        setError(res.data.error || "Failed to add employee");
      }
    } catch (err) {
      console.error("Add employee error:", err.response?.data);
      setError(err.response?.data?.error || err.message);
    }    
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-8">Add New Employee</h3>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Employee ID", name: "employeeId", type: "text" },
          { label: "Date of Birth", name: "dob", type: "date" },
        ].map((f) => (
          <div key={f.name} className="flex flex-col">
            <label className="mb-1 font-semibold">{f.label}</label>
            <input
              type={f.type}
              name={f.name}
              className="input"
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Gender</label>
          <select name="gender" className="input" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Marital Status</label>
          <select name="maritalStatus" className="input" onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Designation</label>
          <input
            type="text"
            name="designation"
            className="input"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Department</label>
          <select name="department" className="input" onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.dep_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Salary</label>
          <input
            type="number"
            name="salary"
            className="input"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Role</label>
          <select name="role" className="input" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-semibold">Upload Image</label>
          <input
            type="file"
            name="image"
            className="input"
            onChange={handleChange}
            accept="image/*"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 text-lg"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
