
import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">

      <div>
        <h2>Dashboard</h2>
        <p>Welcome back! Here's your job search overview.</p>
      </div>

      <div className="navbar-right">

        <button className="notification-btn">
          <Bell size={20} />
        </button>

        <div className="profile">
          <div className="profile-avatar">G</div>

          <div>
            <h4>Gokul</h4>
            <p>Job Seeker</p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Navbar;
