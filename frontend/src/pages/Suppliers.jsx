import { useEffect, useState } from "react";
import { getSuppliers } from "../services/api";
import "./Suppliers.css"; // Imports the CSS file for styling

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const data = await getSuppliers();
                setSuppliers(data);
            } catch (err) {
                console.error("Error fetching suppliers:", err);
                setError("Failed to fetch suppliers");
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    if (loading) return <h2>Loading suppliers...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
  <div className="suppliers-page">
    <div className="suppliers-header">
      <div>
        <h1>Suppliers</h1>
        <p>Manage your spare parts suppliers</p>
      </div>

      <div className="suppliers-count">
        <span>{suppliers.length}</span>
        <small>Total Suppliers</small>
      </div>
    </div>

    <div className="suppliers-card">
      <div className="suppliers-table-wrapper">
        <table className="suppliers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="supplier-id">
                    #{supplier.id}
                  </td>

                  <td className="supplier-name">
                    {supplier.name}
                  </td>

                  <td>{supplier.phone || "N/A"}</td>

                  <td>{supplier.email || "N/A"}</td>

                  <td className="supplier-address">
                    {supplier.address || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-suppliers">
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

export default Suppliers;