import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="sidebar-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <span>📊</span>
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/inventory"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <span>📦</span>
        <span>Inventory</span>
      </NavLink>

      <NavLink
        to="/categories"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <span>🏷️</span>
        <span>Categories</span>
      </NavLink>

      <NavLink
        to="/suppliers"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <span>🚚</span>
        <span>Suppliers</span>
      </NavLink>

      <NavLink
        to="/transactions"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <span>🔄</span>
        <span>Transactions</span>
      </NavLink>
    </nav>
  );
}

export default Sidebar;