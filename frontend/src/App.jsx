import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Inventory from "./pages/Inventory.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import Categories from "./pages/Categories.jsx";
import Transactions from "./Transactions.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
