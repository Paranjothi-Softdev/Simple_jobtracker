
import { useEffect, useState } from "react";
import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";

import ApplicationCharts from "../components/ApplicationCharts";    
import sampleJobs from "../data/sampleJobs";

import {
  Briefcase,
  Send,
  CalendarCheck,
  Trophy,
} from "lucide-react";

function Dashboard() {
  const [jobs, setJobs] = useState(() => {
    try {
      const savedJobs = localStorage.getItem("jobtrack-jobs");

      return savedJobs
        ? JSON.parse(savedJobs)
        : sampleJobs;
    } catch {
      return sampleJobs;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Save jobs whenever the jobs state changes
  useEffect(() => {
    localStorage.setItem("jobtrack-jobs", JSON.stringify(jobs));
  }, [jobs]);

  // CREATE
  function addJob(newJob) {
    setJobs((previousJobs) => [
      newJob,
      ...previousJobs,
    ]);
  }

  // UPDATE
  function updateJob(updatedJob) {
    setJobs((previousJobs) =>
      previousJobs.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      )
    );
  }

  // DELETE
  function deleteJob(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    setJobs((previousJobs) =>
      previousJobs.filter((job) => job.id !== id)
    );
  }

  // CHANGE STATUS
  function changeStatus(id, newStatus) {
    setJobs((previousJobs) =>
      previousJobs.map((job) =>
        job.id === id
          ? { ...job, status: newStatus }
          : job
      )
    );
  }

  // OPEN EDIT FORM
  function handleEdit(job) {
    setEditingJob(job);
    setShowForm(true);
  }

  // CLOSE FORM
  function closeForm() {
    setShowForm(false);
    setEditingJob(null);
  }

  // SEARCH AND FILTER
  let filteredJobs = jobs.filter((job) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      job.company.toLowerCase().includes(searchValue) ||
      job.role.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // SORT
  filteredJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.appliedDate) - new Date(a.appliedDate);
    }

    if (sortBy === "oldest") {
      return new Date(a.appliedDate) - new Date(b.appliedDate);
    }

    if (sortBy === "company") {
      return a.company.localeCompare(b.company);
    }

    return 0;
  });

  // DASHBOARD STATISTICS
  const totalJobs = jobs.length;

  const appliedCount = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewCount = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const selectedCount = jobs.filter(
    (job) => job.status === "Selected"
  ).length;

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <section className="dashboard-content">
          <div className="welcome-section">
            <div>
              <h1>Dashboard</h1>
              <p>Track and manage your job applications.</p>
            </div>

            <button
              className="add-job-btn"
              onClick={() => {
                setEditingJob(null);
                setShowForm(true);
              }}
            >
              + Add Application
            </button>
          </div>

          {/* STATISTICS */}
          <div className="stats-grid">
            <StatCard
              title="Total Applications"
              value={totalJobs}
              icon={Briefcase}
            />

            <StatCard
              title="Applied"
              value={appliedCount}
              icon={Send}
            />

            <StatCard
              title="Interviews"
              value={interviewCount}
              icon={CalendarCheck}
            />

            <StatCard
              title="Selected"
              value={selectedCount}
              icon={Trophy}
            />
          </div>

          <div className="stats-grid">
  {/* Your existing StatCard components */}
</div>

<ApplicationCharts jobs={jobs} />

{/* Your existing toolbar and job applications */}

          {/* SEARCH, FILTER AND SORT */}
          <div className="toolbar">
            <input
              type="text"
              placeholder="Search company or job role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="company">Company A-Z</option>
            </select>
          </div>

          {/* JOB APPLICATIONS */}
          <div className="applications-section">
            <h2>Recent Applications</h2>

            {filteredJobs.length === 0 ? (
              <p className="empty-message">
                No job applications found.
              </p>
            ) : (
              <div className="jobs-grid">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={handleEdit}
                    onDelete={deleteJob}
                    onStatusChange={changeStatus}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <JobForm
          onAdd={addJob}
          onUpdate={updateJob}
          onClose={closeForm}
          initialData={editingJob}
        />
      )}
    </div>
  );
}

export default Dashboard;
