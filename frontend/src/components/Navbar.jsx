import { useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const pageNames = {
    "/": "Dashboard",
    "/inventory": "Inventory",
    "/categories": "Categories",
    "/suppliers": "Suppliers",
    "/transactions": "Transactions",
  };

  const currentPage = pageNames[location.pathname] || "Dashboard";

  return (
    <header className="top-navbar">
      <div className="navbar-page">
        <span className="navbar-page-label">Workspace</span>
        <span className="navbar-divider">/</span>
        <span className="navbar-current">{currentPage}</span>
      </div>

      <div className="navbar-right">
        <span className="navbar-status-dot"></span>
        <span>Inventory Management</span>
      </div>
    </header>
  );
}

export default Navbar;