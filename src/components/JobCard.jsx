
import { MapPin, Calendar, Pencil, Trash2 } from "lucide-react";

function JobCard({ job, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="company-logo">
          {job.company.charAt(0).toUpperCase()}
        </div>

        <div className="job-actions">
          <button onClick={() => onEdit(job)} title="Edit">
            <Pencil size={17} />
          </button>

          <button
            onClick={() => onDelete(job.id)}
            title="Delete"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <h3>{job.role}</h3>
      <p>{job.company}</p>

      <div className="job-details">
        <span>
          <MapPin size={15} />
          {job.location || "Location not specified"}
        </span>

        <span>
          <Calendar size={15} />
          {job.appliedDate}
        </span>
      </div>

      <div className="job-card-footer">
        <span>{job.salary || "Salary not specified"}</span>

        <select
          value={job.status}
          onChange={(e) =>
            onStatusChange(job.id, e.target.value)
          }
          aria-label={`Change status for ${job.company}`}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
}

export default JobCard;
