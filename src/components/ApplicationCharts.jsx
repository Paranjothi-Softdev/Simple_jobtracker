
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#f59e0b",
  "#16a34a",
  "#ef4444",
];

function ApplicationCharts({ jobs }) {
  const statuses = [
    "Applied",
    "Interview",
    "Selected",
    "Rejected",
  ];

  const statusData = statuses.map((status) => ({
    name: status,
    value: jobs.filter((job) => job.status === status).length,
  }));

  // Group applications by month
  const monthlyData = {};

  jobs.forEach((job) => {
    if (!job.appliedDate) return;

    const date = new Date(job.appliedDate + "T00:00:00");

    if (Number.isNaN(date.getTime())) return;

    const month = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  const activityData = Object.entries(monthlyData)
    .map(([month, count]) => ({
      month,
      applications: count,
      date: new Date(month),
    }))
    .sort((a, b) => a.date - b.date);

  return (
    <section className="charts-section">
      <div className="charts-heading">
        <h2>Application Analytics</h2>
        <p>Track your job application performance.</p>
      </div>

      <div className="charts-grid">

        {/* STATUS CHART */}
        <div className="chart-card">
          <h3>Application Status</h3>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ACTIVITY CHART */}
        <div className="chart-card">
          <h3>Application Activity</h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={activityData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />

              <Tooltip />
              <Bar
                dataKey="applications"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {activityData.length === 0 && (
            <p className="chart-empty">
              Add applications to view activity.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}

export default ApplicationCharts;
