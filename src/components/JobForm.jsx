
import { useState } from "react";
import { X } from "lucide-react";

function JobForm({ onAdd, onUpdate, onClose, initialData }) {
  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    role: initialData?.role || "",
    location: initialData?.location || "",
    salary: initialData?.salary || "",
    status: initialData?.status || "Applied",
    appliedDate:
      initialData?.appliedDate ||
      new Date().toISOString().split("T")[0],
    jobType: initialData?.jobType || "Full-time",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.company.trim() || !formData.role.trim()) {
      alert("Company and job role are required.");
      return;
    }

    if (initialData) {
      onUpdate({
        ...initialData,
        ...formData,
      });
    } else {
      onAdd({
        ...formData,
        id: Date.now(),
      });
    }

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="job-form">
        <div className="form-header">
          <h2>
            {initialData ? "Edit Application" : "Add Application"}
          </h2>

          <button type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Company Name</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />

          <label>Job Role</label>
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter job role"
            required
          />

          <label>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />

          <label>Salary</label>
          <input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Example: 5 LPA"
          />

          <label>Application Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>

          <label>Applied Date</label>
          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
          />

          <label>Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>

          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">
              {initialData ? "Save Changes" : "Add Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
