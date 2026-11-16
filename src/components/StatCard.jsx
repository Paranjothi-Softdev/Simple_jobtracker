
function StatCard({ title, value, icon: Icon, color, description }) {
  return (
    <div className="stat-card">

      <div className="stat-header">
        <div>
          <p>{title}</p>
          <h2>{value}</h2>
        </div>

        <div
          className="stat-icon"
          style={{
            backgroundColor: `${color}18`,
            color: color
          }}
        >
          <Icon size={23} />
        </div>
      </div>

      <p className="stat-description">
        {description}
      </p>

    </div>
  );
}

export default StatCard;
