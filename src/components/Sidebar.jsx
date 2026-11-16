
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  Target
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <Target size={27} />
        <h2>PJjobTrack<span>.</span></h2>
      </div>

      <p className="menu-title">MAIN MENU</p>

      <nav className="sidebar-menu">

        <a href="#" className="menu-item active">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </a>

        <a href="#applications" className="menu-item">
          <Briefcase size={19} />
          <span>Applications</span>
        </a>

        <a href="#settings" className="menu-item">
          <Settings size={19} />
          <span>Settings</span>
        </a>

      </nav>

      <div className="sidebar-footer">
        <h4>Keep going!</h4>
        <p>Your next opportunity is waiting for you.</p>
      </div>

    </aside>
  );
}

export default Sidebar;
